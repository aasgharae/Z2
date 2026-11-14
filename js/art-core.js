// ==================== پالت ====================
const SKIN='#ffd6b8', SKIN2='#eeb894', SKIN_SH='#c9906d';
const STONE='#b9b3c9', STONE2='#8f89a8', STONE3='#6e6885';

// ==================== پس‌زمینه ====================
function drawSky(t){
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,'#1b1440'); g.addColorStop(0.5,'#472a67'); g.addColorStop(0.8,'#8e3f6a'); g.addColorStop(1,'#c2506b');
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  for(const s of STARS){
    ctx.globalAlpha=0.25+0.45*Math.sin(t*2+s.p);
    ctx.fillStyle='#fff'; ctx.fillRect(s.x*W,s.y*H,s.r,s.r);
  }
  ctx.globalAlpha=1;
  const mx=W*0.85,my=H*0.14;
  const mg=ctx.createRadialGradient(mx,my,4,mx,my,cell*1.1);
  mg.addColorStop(0,'rgba(255,245,215,0.95)'); mg.addColorStop(0.22,'rgba(255,220,160,0.3)'); mg.addColorStop(1,'rgba(255,220,160,0)');
  ctx.fillStyle=mg; ell(mx,my,cell*1.1,cell*1.1); ctx.fill();
  ctx.fillStyle='rgba(255,248,225,0.95)'; ell(mx,my,cell*0.17,cell*0.17); ctx.fill();
  ctx.fillStyle='rgba(0,0,0,0.06)'; ell(mx+cell*0.05,my-cell*0.03,cell*0.05,cell*0.05); ctx.fill();
  ctx.fillStyle='#33205a';
  ctx.beginPath(); ctx.moveTo(0,H);
  for(let x=0;x<=W;x+=18) ctx.lineTo(x,H-cell*0.6-Math.sin(x*0.011)*cell*0.3);
  ctx.lineTo(W,H); ctx.fill();
  ctx.fillStyle='#251642';
  ctx.beginPath(); ctx.moveTo(0,H);
  for(let x=0;x<=W;x+=18) ctx.lineTo(x,H-cell*0.3-Math.sin(x*0.015+2)*cell*0.22);
  ctx.lineTo(W,H); ctx.fill();
  for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++){
    const x=ox+c*cell,y=oy+r*cell;
    ctx.fillStyle=(r+c)%2?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.026)';
    rr(x+2,y+2,cell-4,cell-4,cell*0.12); ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,0.055)'; ctx.lineWidth=1; ctx.stroke();
  }
}

// ==================== قلعه ====================
function drawCastle(t){
  const wx=ox-cell*1.05, wy=oy-cell*0.2, ww=cell*0.92, wh=cell*ROWS+cell*0.4;
  const g=ctx.createLinearGradient(wx,0,wx+ww,0);
  g.addColorStop(0,'#3d3557'); g.addColorStop(0.7,'#5c527c'); g.addColorStop(1,'#786c9c');
  ctx.fillStyle=g; rr(wx,wy,ww,wh,8); ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,0.2)'; ctx.lineWidth=1;
  const bh=cell*0.15;
  for(let j=0;j<wh/bh;j++){
    ctx.beginPath(); ctx.moveTo(wx,wy+j*bh); ctx.lineTo(wx+ww,wy+j*bh); ctx.stroke();
    const off=(j%2)*ww/4;
    for(let i=0;i<2;i++){
      const bx=wx+((off+i*ww/2)%ww);
      ctx.beginPath(); ctx.moveTo(bx,wy+j*bh); ctx.lineTo(bx,wy+(j+1)*bh); ctx.stroke();
    }
  }
  for(let r=0;r<ROWS;r++){
    const fy=rowY(r)-cell*0.1, fx=wx+ww-4;
    ctx.globalCompositeOperation='lighter';
    const fg=ctx.createRadialGradient(fx,fy,1,fx,fy,cell*0.4);
    fg.addColorStop(0,'rgba(255,180,80,'+(0.55+0.22*Math.sin(t*7+r))+')'); fg.addColorStop(1,'rgba(255,120,40,0)');
    ctx.fillStyle=fg; ell(fx,fy,cell*0.4,cell*0.4); ctx.fill();
    ctx.globalCompositeOperation='source-over';
    ctx.fillStyle='#ffd98a';
    ell(fx,fy,3+Math.sin(t*9+r)*1.3,5+Math.cos(t*8+r)*1.6); ctx.fill();
  }
  for(const ty of [wy,wy+wh]){
    ctx.fillStyle='#6a5f8c'; ell(wx+ww/2,ty,cell*0.33,cell*0.27); ctx.fill();
    ctx.fillStyle='#453a63';
    ctx.beginPath(); ctx.moveTo(wx+ww/2-cell*0.31,ty);
    ctx.lineTo(wx+ww/2,ty-cell*0.44); ctx.lineTo(wx+ww/2+cell*0.31,ty); ctx.fill();
    const wav=Math.sin(t*5)*3;
    ctx.strokeStyle='#d8cff5'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(wx+ww/2,ty-cell*0.44); ctx.lineTo(wx+ww/2,ty-cell*0.7); ctx.stroke();
    ctx.fillStyle='#ff6b6b';
    ctx.beginPath(); ctx.moveTo(wx+ww/2,ty-cell*0.7);
    ctx.lineTo(wx+ww/2+15+wav,ty-cell*0.65); ctx.lineTo(wx+ww/2,ty-cell*0.6); ctx.fill();
  }
  ctx.fillStyle='#241b38';
  ctx.beginPath(); ctx.moveTo(wx+ww*0.2,wy+wh); ctx.lineTo(wx+ww*0.2,wy+wh-cell*0.46);
  ctx.arc(wx+ww*0.5,wy+wh-cell*0.46,ww*0.3,Math.PI,0);
  ctx.lineTo(wx+ww*0.8,wy+wh); ctx.fill();
}

// ==================== درخشش ====================
function glow(x,y,r,c,a){
  ctx.globalCompositeOperation='lighter';
  const g=ctx.createRadialGradient(x,y,1,x,y,r);
  g.addColorStop(0,'rgba('+c+','+(a||0.5)+')'); g.addColorStop(1,'rgba('+c+',0)');
  ctx.fillStyle=g; ell(x,y,r,r); ctx.fill();
  ctx.globalCompositeOperation='source-over';
}

// ==================== بدن پایه ====================
function drawLegs(x,y,s,sway,skin,skin2,shoe){
  limb(x-s*0.09,y+s*0.10,x-s*0.105+sway*0.7,y+s*0.28,s*0.128,skin);
  limb(x+s*0.09,y+s*0.10,x+s*0.105+sway*0.7,y+s*0.28,s*0.128,skin);
  limb(x-s*0.105+sway*0.7,y+s*0.28,x-s*0.115+sway*1.5,y+s*0.40,s*0.088,skin2);
  limb(x+s*0.105+sway*0.7,y+s*0.28,x+s*0.115+sway*1.5,y+s*0.40,s*0.088,skin2);
  if(shoe){
    ctx.fillStyle=shoe;
    ell(x-s*0.12+sway*1.6,y+s*0.415,s*0.058,s*0.033); ctx.fill();
    ell(x+s*0.12+sway*1.6,y+s*0.415,s*0.058,s*0.033); ctx.fill();
  }
}

function drawTorso(x,y,s,skin){
  ctx.fillStyle=skin;
  ctx.beginPath();
  ctx.moveTo(x-s*0.135,y-s*0.17);
  ctx.quadraticCurveTo(x-s*0.158,y-s*0.02,x-s*0.08,y+s*0.07);
  ctx.quadraticCurveTo(x-s*0.19,y+s*0.13,x-s*0.13,y+s*0.19);
  ctx.lineTo(x+s*0.13,y+s*0.19);
  ctx.quadraticCurveTo(x+s*0.19,y+s*0.13,x+s*0.08,y+s*0.07);
  ctx.quadraticCurveTo(x+s*0.158,y-s*0.02,x+s*0.135,y-s*0.17);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle='rgba(150,90,65,0.28)'; ctx.lineWidth=s*0.013;
  ctx.beginPath(); ctx.moveTo(x-s*0.068,y+s*0.072); ctx.quadraticCurveTo(x,y+s*0.1,x+s*0.068,y+s*0.072); ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,0.22)'; ctx.lineWidth=s*0.02;
  ctx.beginPath(); ctx.moveTo(x-s*0.1,y-s*0.1); ctx.quadraticCurveTo(x-s*0.06,y-s*0.02,x-s*0.08,y+s*0.06); ctx.stroke();
}

function drawBottom(x,y,s,c){
  ctx.fillStyle=c;
  ctx.beginPath();
  ctx.moveTo(x-s*0.135,y+s*0.085);
  ctx.lineTo(x+s*0.135,y+s*0.085);
  ctx.lineTo(x+s*0.085,y+s*0.168);
  ctx.lineTo(x,y+s*0.205);
  ctx.lineTo(x-s*0.085,y+s*0.168);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle=c; ctx.lineWidth=s*0.024; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(x-s*0.135,y+s*0.085); ctx.lineTo(x-s*0.152,y+s*0.128); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x+s*0.135,y+s*0.085); ctx.lineTo(x+s*0.152,y+s*0.128); ctx.stroke();
}

function drawPubic(x,y,s){
  ctx.fillStyle='rgba(110,62,74,0.55)';
  ctx.beginPath();
  ctx.moveTo(x-s*0.05,y+s*0.132);
  ctx.lineTo(x+s*0.05,y+s*0.132);
  ctx.lineTo(x,y+s*0.19);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle='rgba(190,105,115,0.5)'; ctx.lineWidth=s*0.012;
  ctx.beginPath(); ctx.moveTo(x,y+s*0.16); ctx.lineTo(x,y+s*0.188); ctx.stroke();
}

function drawBust(x,y,s,size,jig,skin,cover,bare){
  const by=y-s*0.115+jig, r=size*s*0.118;
  ctx.fillStyle='rgba(150,85,70,0.28)';
  ell(x-s*0.072,by+r*0.8,r*0.95,r*0.44); ctx.fill();
  ell(x+s*0.072,by+r*0.8,r*0.95,r*0.44); ctx.fill();
  ctx.fillStyle=skin;
  ell(x-s*0.083,by,r,r*0.96); ctx.fill();
  ell(x+s*0.083,by,r,r*0.96); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.4)';
  ell(x-s*0.118,by-r*0.32,r*0.3,r*0.24); ctx.fill();
  ell(x+s*0.048,by-r*0.32,r*0.3,r*0.24); ctx.fill();
  ctx.strokeStyle='rgba(150,85,70,0.35)'; ctx.lineWidth=s*0.011;
  ctx.beginPath(); ctx.arc(x-s*0.083,by+r*0.55,r*0.7,0.2,Math.PI-0.2); ctx.stroke();
  if(bare){
    ctx.fillStyle='rgba(198,105,102,0.9)';
    ell(x-s*0.075,by+r*0.12,r*0.2,r*0.23); ctx.fill();
    ell(x+s*0.075,by+r*0.12,r*0.2,r*0.23); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.55)';
    ell(x-s*0.075,by+r*0.06,r*0.07,r*0.085); ctx.fill();
    ell(x+s*0.075,by+r*0.06,r*0.07,r*0.085); ctx.fill();
  }
  if(cover){
    ctx.fillStyle=cover;
    ctx.beginPath();
    ctx.moveTo(x-s*0.158,by-r*0.48);
    ctx.quadraticCurveTo(x,by-r*0.1,x+s*0.158,by-r*0.48);
    ctx.quadraticCurveTo(x+s*0.172,by+r*0.58,x+s*0.08,by+r*0.8);
    ctx.quadraticCurveTo(x,by+r*0.94,x-s*0.08,by+r*0.8);
    ctx.quadraticCurveTo(x-s*0.172,by+r*0.58,x-s*0.158,by-r*0.48);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,0.22)'; ctx.lineWidth=s*0.01;
    ctx.beginPath(); ctx.moveTo(x,by-r*0.12); ctx.lineTo(x,by+r*0.86); ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.16)';
    ell(x-s*0.1,by+r*0.1,r*0.22,r*0.3); ctx.fill();
  }
}

function drawFace(x,hy,s,o){
  const eye=o.eye||'#4a2a66';
  for(const sx of [-1,1]){
    const ex=x+sx*s*0.062;
    ctx.fillStyle='#fff'; ell(ex,hy+s*0.012,s*0.045,s*0.054); ctx.fill();
    ctx.fillStyle=eye; ell(ex,hy+s*0.018,s*0.03,s*0.04); ctx.fill();
    ctx.fillStyle='#180d20'; ell(ex,hy+s*0.025,s*0.014,s*0.021); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.97)'; ell(ex-s*0.013,hy,s*0.013,s*0.015); ctx.fill();
    ctx.strokeStyle='rgba(28,14,38,0.9)'; ctx.lineWidth=s*0.014; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(ex-s*0.047,hy-s*0.032); ctx.quadraticCurveTo(ex,hy-s*0.062,ex+s*0.047,hy-s*0.03); ctx.stroke();
  }
  ctx.fillStyle='rgba(255,105,148,'+(o.blush||0.42)+')';
  ell(x-s*0.1,hy+s*0.063,s*0.035,s*0.02); ctx.fill();
  ell(x+s*0.1,hy+s*0.063,s*0.035,s*0.02); ctx.fill();
  ctx.strokeStyle='#c2506b'; ctx.lineWidth=s*0.012; ctx.lineCap='round';
  if(o.open){
    ctx.fillStyle='#8f2b3f'; ell(x,hy+s*0.078,s*0.024,s*0.03); ctx.fill();
    ctx.fillStyle='#d06a7c'; ell(x,hy+s*0.088,s*0.014,s*0.012); ctx.fill();
  }else{
    ctx.beginPath(); ctx.arc(x,hy+s*0.068,s*0.027,0.18*Math.PI,0.82*Math.PI); ctx.stroke();
  }
}

function drawParts(){
  for(const p of G.parts){
    ctx.globalAlpha=Math.max(0,p.life/p.max);
    ctx.fillStyle=p.color;
    if(p.heart){
      const s2=p.size;
      ctx.beginPath();
      ctx.moveTo(p.x,p.y+s2*0.6);
      ctx.bezierCurveTo(p.x-s2*1.4,p.y-s2*0.3,p.x-s2*0.4,p.y-s2*1.3,p.x,p.y-s2*0.4);
      ctx.bezierCurveTo(p.x+s2*0.4,p.y-s2*1.3,p.x+s2*1.4,p.y-s2*0.3,p.x,p.y+s2*0.6);
      ctx.fill();
    }else{
      ell(p.x,p.y,p.size,p.size); ctx.fill();
    }
  }
  ctx.globalAlpha=1;
}
function drawFloats(){
  ctx.textAlign='center'; ctx.font='bold 15px Tahoma';
  for(const f of G.floats){
    ctx.globalAlpha=Math.min(1,f.t);
    ctx.fillStyle=f.color; ctx.fillText(f.text,f.x,f.y);
  }
  ctx.globalAlpha=1;
}
function drawAnn(){
  ctx.textAlign='center';
  let i=0;
  for(const a of G.ann){
    ctx.globalAlpha=Math.min(1,a.t/0.5);
    ctx.font='900 34px Tahoma';
    ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillText(a.text,W/2+2,H*0.3+2-i*44);
    const g=ctx.createLinearGradient(W/2-100,0,W/2+100,0);
    g.addColorStop(0,'#ffd76a'); g.addColorStop(1,'#ff9d5c');
    ctx.fillStyle=g; ctx.fillText(a.text,W/2,H*0.3-i*44);
    i++;
  }
  ctx.globalAlpha=1;
}
function drawVignette(){
  const g=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*0.35,W/2,H/2,Math.max(W,H)*0.75);
  g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(6,2,14,0.55)');
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
}
function drawPrep(){
  if(G.phase!=='prep'||!G.started||G.over) return;
  ctx.textAlign='center'; ctx.font='bold 17px Tahoma';
  ctx.fillStyle='rgba(255,255,255,0.85)';
  ctx.fillText('⏳ موج بعدی: '+Math.max(0,Math.ceil(G.prepT)).toLocaleString('fa-IR')+' ثانیه',W/2,oy-10);
  if(G.wave===0){
    ctx.font='bold 15px Tahoma'; ctx.fillStyle='#ffd76a';
    ctx.fillText('💡 روی گوی‌های نور بزنید تا جمعشان کنید',W/2,oy+cell*ROWS+24);
  }
}
function drawGhost(t){
  if(!G.sel||!G.hover) return;
  const c=G.hover;
  if(c.row<0||c.row>=ROWS||c.col<0||c.col>=COLS) return;
  const ok=!G.grid[c.row][c.col]&&G.light>=UNITS[G.sel].cost&&G.cds[G.sel]<=0;
  const x=ox+c.col*cell,y=oy+c.row*cell;
  ctx.fillStyle=ok?'rgba(126,224,129,0.22)':'rgba(255,107,107,0.25)';
  rr(x+2,y+2,cell-4,cell-4,cell*0.12); ctx.fill();
  ctx.strokeStyle=ok?'#7ee081':'#ff6b6b'; ctx.lineWidth=2; ctx.stroke();
  drawUnit({type:G.sel,row:c.row,col:c.col,x:colX(c.col),y:rowY(c.row),anim:0,flash:0,recoil:0,target:null,jig:0,hp:1,maxHp:1,strip:0},t,0.5);
}
