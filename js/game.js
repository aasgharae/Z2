// ==================== وضعیت بازی ====================
const G={
  started:false, paused:false, over:false,
  light:150, wave:0, hearts:3, kills:0, fucked:0,
  units:[], enemies:[], projs:[], orbs:[], parts:[], floats:[], ann:[],
  grid:Array.from({length:ROWS},()=>Array(COLS).fill(null)),
  cds:{flower:0,archer:0,wall:0,mage:0},
  phase:'prep', prepT:8, queue:[], spawnT:0,
  skyT:3, sel:null, hover:null, shake:0,
};
let best=0; try{ best=parseInt(localStorage.getItem('negahban_best')||'0')||0; }catch(e){}

function rowY(r){ return oy+r*cell+cell/2; }
function colX(c){ return ox+c*cell+cell/2; }
function laneY(r){ return oy+r*cell+cell*0.80; }

// ==================== موج‌ها ====================
function buildQueue(n){
  const q=[]; const count=3+Math.floor(n*1.7);
  for(let i=0;i<count;i++){
    let t='div'; const r=Math.random();
    if(n>=2&&r<0.22+n*0.01) t='runner';
    if(n>=3&&r>0.86) t='brute';
    if(n>=4&&r>0.5&&r<0.62) t='ghoul';
    if(n>=7&&r<0.14) t='ghoul';
    q.push({type:t, delay:Math.max(0.55,(2.3-n*0.12))*(0.7+Math.random()*0.6)});
  }
  if(n%5===0) q.splice(Math.floor(q.length/2),0,{type:'ghoul',delay:1.2});
  return q;
}
function startWave(n){
  G.wave=n; G.phase='fight'; G.queue=buildQueue(n); G.spawnT=1.2;
  announce('🌊 موج '+n);
  chord([392,523,659],0.16,'square',0.07);
}
function spawnEnemy(type){
  const d=EDEF[type];
  const row=Math.floor(Math.random()*ROWS);
  const hpMul=1+(G.wave-1)*0.09;
  G.enemies.push({type,row,x:ox+cell*COLS+cell*0.6,y:laneY(row),
    hp:Math.round(d.hp*hpMul),maxHp:Math.round(d.hp*hpMul),
    atk:0,anim:Math.random()*6,flash:0,dead:false,seed:Math.random()*10,
    jig:0,jigV:0,mating:false,target:null,mateT:0,cool:0});
}

// ==================== موجودیت‌ها ====================
function placeUnit(type,row,col){
  const u={type,row,col,x:colX(col),y:rowY(row),hp:UNITS[type].hp,maxHp:UNITS[type].hp,
    fire:0.4,prod:3.5,anim:Math.random()*6,flash:0,recoil:0,target:null,jig:0,jigV:0,
    strip:0,mate:false,dead:false};
  G.units.push(u); G.grid[row][col]=u;
  G.cds[type]=UNITS[type].cd;
  G.light-=UNITS[type].cost;
  beep(500,0.08,'triangle',0.08);
  puff(u.x,u.y+cell*0.2,'#7ee081',8);
}
function killUnit(u){
  u.dead=true;
  G.grid[u.row][u.col]=null;
  const i=G.units.indexOf(u); if(i>=0)G.units.splice(i,1);
  puff(u.x,u.y,'#cfc6e8',14);
}
function killEnemy(e){
  e.dead=true; G.kills+=EDEF[e.type].score;
  puff(e.x,e.y-cell*0.2,EDEF[e.type].color,16);
  hearts(e.x,e.y-cell*0.3);
  beep(220,0.12,'sawtooth',0.06);
  if(Math.random()<0.20) spawnOrb(e.x,e.y-cell*0.3,25);
}
function damageEnemy(e,dmg){
  e.hp-=dmg; e.flash=1; e.jigV+=cell*2.4;
  if(e.hp<=0&&!e.dead) killEnemy(e);
}
function spawnOrb(x,y,val){
  G.orbs.push({x:Math.min(Math.max(x,ox+cell*0.4),ox+cell*(COLS-0.4)),y:y,gy:laneY(Math.floor((y-oy)/cell))-cell*0.1,
    vy:cell*0.55,val:val,life:9,landed:false,seed:Math.random()*7});
}
function collectOrb(o){
  G.light+=o.val;
  G.floats.push({x:o.x,y:o.y-cell*0.3,text:'+'+o.val,t:1.2,color:'#ffd76a'});
  sparkle(o.x,o.y);
  beep(880,0.12,'sine',0.1); beep(1318,0.1,'sine',0.06);
}
function breach(e){
  e.dead=true; G.hearts--; G.shake=0.6;
  beep(80,0.35,'sawtooth',0.18);
  G.floats.push({x:ox+cell*0.3,y:e.y-cell*0.3,text:'💥',t:1,color:'#ff6b6b'});
  if(G.hearts<=0) gameOver();
}
function announce(text){ G.ann.push({text:text,t:2.4}); }
function gameOver(){
  G.over=true;
  if(G.wave>best){ best=G.wave; try{localStorage.setItem('negahban_best',String(best));}catch(e){} }
  document.getElementById('ovWave').textContent=G.wave.toLocaleString('fa-IR');
  document.getElementById('ovKill').textContent=G.kills.toLocaleString('fa-IR');
  document.getElementById('ovBest').textContent=best.toLocaleString('fa-IR');
  document.getElementById('over').classList.remove('hidden');
  chord([330,262,196,131],0.3,'sawtooth',0.09);
}

// ==================== افکت‌ها ====================
function puff(x,y,color,n){
  for(let i=0;i<n;i++){
    const a=Math.random()*Math.PI*2, s=cell*(0.5+Math.random()*1.2);
    G.parts.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-30,life:0.6+Math.random()*0.4,max:1,color:color,size:2+Math.random()*3,grav:120});
  }
  if(G.parts.length>280) G.parts.splice(0,G.parts.length-280);
}
function sparkle(x,y){
  for(let i=0;i<10;i++){
    const a=Math.random()*Math.PI*2, s=cell*(0.3+Math.random()*0.8);
    G.parts.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:0.5,max:0.5,color:'#ffe9a3',size:1.5+Math.random()*2,grav:0});
  }
}
function hearts(x,y){
  for(let i=0;i<4;i++){
    G.parts.push({x:x+(Math.random()-0.5)*cell*0.5,y:y,vx:(Math.random()-0.5)*cell,vy:-cell*(0.8+Math.random()),life:0.8,max:0.8,color:'#ff8fc4',size:2.5+Math.random()*2,grav:20,heart:true});
  }
}
function splash(x,y){
  for(let i=0;i<14;i++){
    G.parts.push({x:x+(Math.random()-0.5)*cell*0.4,y:y,vx:(Math.random()-0.5)*cell*1.4,vy:-cell*(0.4+Math.random()*1.2),life:0.9,max:0.9,color:'#fff4f8',size:2+Math.random()*2.5,grav:260});
  }
}
function hitSparks(x,y){
  for(let i=0;i<5;i++){
    G.parts.push({x:x,y:y,vx:(Math.random()-0.5)*cell*2,vy:-Math.random()*cell,life:0.3,max:0.3,color:'#ffd76a',size:2,grav:200});
  }
}
function finishMate(e,u){
  u.mate=false;
  splash(u.x,u.y);
  hearts(u.x,u.y-cell*0.25);
  G.shake=0.45; G.fucked++;
  G.floats.push({x:u.x,y:u.y-cell*0.5,text:'💦',t:1.2,color:'#fff'});
  killUnit(u);
  e.mating=false; e.target=null; e.cool=1.2;
  beep(300,0.18,'sine',0.09); beep(180,0.3,'sawtooth',0.06);
}

// ==================== به‌روزرسانی ====================
function update(dt){
  for(const k in G.cds) G.cds[k]=Math.max(0,G.cds[k]-dt);
  if(G.phase==='prep'){
    G.prepT-=dt;
    if(G.prepT<=0) startWave(G.wave+1);
  }else{
    if(G.queue.length){
      G.spawnT-=dt;
      if(G.spawnT<=0){ const it=G.queue.shift(); spawnEnemy(it.type); G.spawnT=G.queue.length?G.queue[0].delay:0.1; }
    }else if(G.enemies.length===0){
      G.phase='prep'; G.prepT=9;
      G.light+=50;
      announce('✅ موج '+(G.wave)+' تمام شد! +۵۰ نور');
      chord([523,659,784],0.14,'triangle',0.08);
    }
  }
  G.skyT-=dt;
  if(G.skyT<=0){
    G.skyT=G.phase==='prep'?4.5:6.5;
    const c=Math.floor(Math.random()*COLS);
    spawnOrb(colX(c),oy-cell*0.5,25);
  }
  for(const u of G.units){
    u.anim+=dt; u.flash=Math.max(0,u.flash-dt*4); u.recoil=Math.max(0,u.recoil-dt*5);
    u.jigV+=(-u.jig*220-u.jigV*13)*dt; u.jig+=u.jigV*dt;
    const lim=cell*0.07; u.jig=Math.max(-lim,Math.min(lim,u.jig));
    u.strip=Math.max(u.strip,(1-u.hp/u.maxHp)*2.5);
    if(u.mate) continue;
    if(u.type==='flower'){
      u.prod-=dt;
      if(u.prod<=0){ u.prod=8; spawnOrb(u.x,u.y-cell*0.25,25); }
    }else if(u.type==='archer'||u.type==='mage'){
      u.fire-=dt;
      let tgt=null;
      for(const e of G.enemies){ if(!e.dead&&e.row===u.row&&e.x>u.x){ if(!tgt||e.x<tgt.x) tgt=e; } }
      u.target=tgt;
      if(tgt&&u.fire<=0){
        u.fire=UNITS[u.type].rate; u.recoil=1; u.jigV-=cell*3.4;
        if(u.type==='archer'){
          G.projs.push({kind:'arrow',x:u.x+cell*0.22,y:u.y-cell*0.06,row:u.row,spd:cell*7.5,dmg:UNITS.archer.dmg});
          beep(340,0.07,'square',0.045);
        }else{
          G.projs.push({kind:'fire',x:u.x+cell*0.22,y:u.y-cell*0.04,row:u.row,spd:cell*4.8,dmg:UNITS.mage.dmg,splash:UNITS.mage.splash});
          beep(150,0.22,'sawtooth',0.055);
        }
      }
    }
  }
  for(const e of G.enemies){
    if(e.dead) continue;
    e.anim+=dt; e.flash=Math.max(0,e.flash-dt*5); e.cool=Math.max(0,e.cool-dt);
    e.jigV+=(-e.jig*200-e.jigV*12)*dt; e.jig+=e.jigV*dt;
    const el2=cell*0.07; e.jig=Math.max(-el2,Math.min(el2,e.jig));

    if(e.mating){
      const u=e.target;
      if(!u||u.dead){ e.mating=false; e.target=null; e.cool=0.6; if(u)u.mate=false; }
      else{
        e.mateT-=dt;
        u.strip=Math.min(3,u.strip+dt*1.6);
        if(Math.random()<0.25) hearts(u.x+cell*0.15,u.y-cell*0.15);
        if(e.mateT<=0) finishMate(e,u);
      }
      continue;
    }

    const d=EDEF[e.type];
    let blk=null;
    for(const u of G.units){
      if(u.dead) continue;
      if(u.row===e.row && (
