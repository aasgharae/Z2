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
      if(u.row===e.row && (e.x-d.r*cell)<(u.x+cell*0.36) && e.x>u.x-cell*0.1){ blk=u; break; }
    }
    if(blk){
      if(d.fuck && !blk.mate && e.cool<=0){
        e.mating=true; e.target=blk; e.mateT=d.fuckTime; blk.mate=true; blk.target=null;
        announce('😈 غول یکی را گرفت!');
        beep(160,0.2,'sawtooth',0.1);
      }else if(!d.fuck){
        e.atk-=dt;
        if(e.atk<=0){
          e.atk=d.rate; blk.hp-=d.dmg; blk.flash=1; blk.jigV+=cell*3;
          blk.strip=Math.min(3,blk.strip+0.42);
          hitSparks(blk.x+cell*0.2,blk.y);
          beep(120,0.06,'square',0.05);
          if(blk.hp<=0) killUnit(blk);
        }
      }
    }else{
      e.x-=d.spd*(1+(G.wave-1)*0.015)*dt;
    }
    if(e.x<ox-cell*0.35) breach(e);
  }
  for(const p of G.projs){
    p.x+=p.spd*dt;
    if(p.kind==='fire'&&Math.random()<0.5)
      G.parts.push({x:p.x,y:p.y,vx:(Math.random()-0.5)*20,vy:(Math.random()-0.5)*20,life:0.3,max:0.3,color:'#ff9d5c',size:2.5,grav:0});
    let hit=null;
    for(const e of G.enemies){
      if(e.dead||e.row!==p.row) continue;
      const er=EDEF[e.type].r;
      if((e.x-er*cell)<p.x && p.x<(e.x+er*cell)){ hit=e; break; }
    }
    if(hit){
      damageEnemy(hit,p.dmg);
      if(p.kind==='fire'&&p.splash){
        for(const e2 of G.enemies){ if(!e2.dead&&e2.row===p.row&&Math.abs(e2.x-hit.x)<p.splash) damageEnemy(e2,p.dmg*0.6); }
        puff(hit.x,hit.y-cell*0.2,'#ff8a3c',12);
        beep(100,0.15,'sawtooth',0.06);
      }else{
        hitSparks(p.x,p.y);
      }
      p.dead=true;
    }
    if(p.x>ox+cell*(COLS+0.8)) p.dead=true;
  }
  for(const o of G.orbs){
    if(!o.landed){
      o.y+=o.vy*dt; o.x+=Math.sin(o.y*0.05+o.seed)*0.3;
      if(o.y>=o.gy){ o.y=o.gy; o.landed=true; }
    }else{
      o.life-=dt;
      o.x+=Math.sin(performance.now()*0.002+o.seed)*0.15;
    }
  }
  for(const pt of G.parts){ pt.life-=dt; pt.x+=pt.vx*dt; pt.y+=pt.vy*dt; pt.vy+=pt.grav*dt; }
  for(const f of G.floats){ f.t-=dt; f.y-=cell*0.5*dt; }
  for(const a of G.ann) a.t-=dt;
  G.enemies=G.enemies.filter(e=>!e.dead);
  G.projs=G.projs.filter(p=>!p.dead);
  G.orbs=G.orbs.filter(o=>o.life>0);
  G.parts=G.parts.filter(p=>p.life>0);
  G.floats=G.floats.filter(f=>f.t>0);
  G.ann=G.ann.filter(a=>a.t>0);
}

// ==================== رندر ====================
function render(now){
  const t=now/1000;
  ctx.clearRect(0,0,W,H);
  ctx.save();
  if(G.shake>0){
    G.shake=Math.max(0,G.shake-0.03);
    ctx.translate((Math.random()-0.5)*G.shake*14,(Math.random()-0.5)*G.shake*14);
  }
  drawSky(t);
  drawCastle(t);
  for(const o of G.orbs) drawOrb(o,t);
  const us=G.units.slice().sort((a,b)=>a.row-b.row||a.x-b.x);
  for(const u of us) drawUnit(u,t);
  for(const e of G.enemies) drawEnemy(e,t);
  for(const p of G.projs) drawProj(p);
  drawParts();
  drawFloats();
  drawGhost(t);
  ctx.restore();
  drawAnn();
  drawPrep();
  if(G.paused&&G.started&&!G.over){
    ctx.fillStyle='rgba(10,6,24,0.55)'; ctx.fillRect(0,0,W,H);
    ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.font='900 40px Tahoma';
    ctx.fillText('⏸ مکث',W/2,H/2);
  }
  document.getElementById('light').textContent=G.light.toLocaleString('fa-IR');
  document.getElementById('wave').textContent=G.wave.toLocaleString('fa-IR');
  document.getElementById('hearts').textContent='❤️'.repeat(Math.max(0,G.hearts))+'🖤'.repeat(Math.max(0,3-G.hearts));
  for(const k in UNITS){
    const el=document.querySelector('.card[data-type="'+k+'"]');
    if(el) el.classList.toggle('off',G.cds[k]>0||G.light<UNITS[k].cost);
  }
}

// ==================== حلقه ====================
let last=performance.now();
function loop(now){
  let dt=(now-last)/1000; last=now;
  if(dt>0.05) dt=0.05;
  if(G.started&&!G.paused&&!G.over) update(dt);
  render(now);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// ==================== ورودی ====================
function toGame(e){ const r=canvas.getBoundingClientRect(); return {x:e.clientX-r.left,y:e.clientY-r.top}; }
function cellAt(p){
  const col=Math.floor((p.x-ox)/cell), row=Math.floor((p.y-oy)/cell);
  if(col<0||col>=COLS||row<0||row>=ROWS) return null;
  return {row:row,col:col};
}
canvas.addEventListener('pointerdown',function(e){
  if(!G.started||G.paused||G.over) return;
  const p=toGame(e);
  for(let i=G.orbs.length-1;i>=0;i--){
    const o=G.orbs[i];
    const dx=p.x-o.x,dy=p.y-o.y;
    if(dx*dx+dy*dy<cell*cell*0.3){ collectOrb(o); G.orbs.splice(i,1); return; }
  }
  if(G.sel){
    const c=cellAt(p);
    if(!c) return;
    if(G.grid[c.row][c.col]||G.light<UNITS[G.sel].cost||G.cds[G.sel]>0){
      beep(160,0.12,'square',0.07);
      const el=document.querySelector('.card[data-type="'+G.sel+'"]');
      if(el){ el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
      return;
    }
    placeUnit(G.sel,c.row,c.col);
    if(!e.shiftKey) G.sel=null;
    document.querySelectorAll('.card').forEach(x=>x.classList.remove('sel'));
  }
});
canvas.addEventListener('pointermove',function(e){ G.hover=cellAt(toGame(e)); });
canvas.addEventListener('contextmenu',function(e){ e.preventDefault(); });

// ==================== کارت‌ها و دکمه‌ها ====================
const cardsEl=document.getElementById('cards');
function paintPortrait(cv,type){
  const old=ctx;
  ctx=cv.getContext('2d');
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,cv.width,cv.height);
  drawChar(type,cv.width/2,cv.height*0.46,cv.width*0.8,{anim:0.8,jig:0,recoil:0,flash:0,target:false,strip:0});
  ctx=old;
}
for(const k in UNITS){
  const d=UNITS[k];
  const b=document.createElement('div');
  b.className='card'; b.dataset.type=k;
  const pv=document.createElement('canvas');
  pv.width=62; pv.height=62;
  b.appendChild(pv);
  const lbl=document.createElement('div'); lbl.className='nm'; lbl.textContent=d.name; b.appendChild(lbl);
  const cst=document.createElement('div'); cst.className='cs'; cst.textContent='💡'+d.cost; b.appendChild(cst);
  paintPortrait(pv,k);
  b.addEventListener('pointerdown',function(ev){
    ev.stopPropagation();
    if(G.cds[k]>0){ b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); return; }
    if(G.sel===k){ G.sel=null; b.classList.remove('sel'); return; }
    G.sel=k;
    document.querySelectorAll('.card').forEach(x=>x.classList.remove('sel'));
    b.classList.add('sel');
    beep(600,0.06,'triangle',0.06);
  });
  cardsEl.appendChild(b);
}
document.getElementById('pauseBtn').addEventListener('click',function(){
  if(!G.started||G.over) return;
  G.paused=!G.paused;
  this.textContent=G.paused?'▶️':'⏸️';
});
document.getElementById('sndBtn').addEventListener('click',function(){
  muted=!muted; this.textContent=muted?'🔇':'🔊';
});
document.getElementById('startBtn').addEventListener('click',function(){
  document.getElementById('intro').classList.add('hidden');
  G.started=true;
  beep(523,0.15,'triangle',0.1);
  announce('🛡 از قلعه دفاع کنید!');
});
document.getElementById('againBtn').addEventListener('click',function(){ location.reload(); });
if(best>0) document.getElementById('bestIntro').textContent='🏆 رکورد شما: موج '+best.toLocaleString('fa-IR');
