// ==================== پالت ====================
const SKIN='#ffd6b8', SKIN2='#eeb894', SKIN_SH='#c9906d';

// ==================== پس‌زمینه ====================
function drawSky(t){
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,'#241b4d'); g.addColorStop(0.55,'#4a2b6b'); g.addColorStop(1,'#c2506b');
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  for(const s of STARS){
    ctx.globalAlpha=0.35+0.35*Math.sin(t*2+s.p);
    ctx.fillStyle='#fff'; ctx.fillRect(s.x*W,s.y*H,s.r,s.r);
  }
  ctx.globalAlpha=1;
  const mx=W*0.82,my=H*0.13;
  const mg=ctx.createRadialGradient(mx,my,4,mx,my,cell*0.8);
  mg.addColorStop(0,'rgba(255,240,200,0.9)'); mg.addColorStop(0.25,'rgba(255,220,150,0.25)'); mg.addColorStop(1,'rgba(255,220,150,0)');
  ctx.fillStyle=mg; ell(mx,my,cell*0.8,cell*0.8); ctx.fill();
  ctx.fillStyle='#3a2358';
  ctx.beginPath(); ctx.moveTo(0,H);
  for(let x=0;x<=W;x+=20) ctx.lineTo(x,H-cell*0.5-Math.sin(x*0.01)*cell*0.25);
  ctx.lineTo(W,H); ctx.fill();
  ctx.fillStyle='#2c1a44';
  ctx.beginPath(); ctx.moveTo(0,H);
  for(let x=0;x<=W;x+=20) ctx.lineTo(x,H-cell*0.25-Math.sin(x*0.013+2)*cell*0.18);
  ctx.lineTo(W,H); ctx.fill();
  for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++){
    const x=ox+c*cell,y=oy+r*cell;
    ctx.fillStyle=(r+c)%2?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.028)';
    rr(x+2,y+2,cell-4,cell-4,cell*0.12); ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,0.06)'; ctx.lineWidth=1; ctx.stroke();
  }
}

// ==================== قلعه ====================
function drawCastle(t){
  const wx=ox-cell*1.02, wy=oy-cell*0.18, ww=cell*0.9, wh=cell*ROWS+cell*0.36;
  const g=ctx.createLinearGradient(wx,0,wx+ww,0);
  g.addColorStop(0,'#4d4468'); g.addColorStop(1,'#6e6490');
  ctx.fillStyle=g; rr(wx,wy,ww,wh,8); ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,0.18)'; ctx.lineWidth=1;
  const bh=cell*0.16;
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
    const fg=ctx.createRadialGradient(fx,fy,1,fx,fy,cell*0.35);
    fg.addColorStop(0,'rgba(255,180,80,'+(0.5+0.2*Math.sin(t*7+r))+')'); fg.addColorStop(1,'rgba(255,120,40,0)');
    ctx.fillStyle=fg; ell(fx,fy,cell*0.35,cell*0.35); ctx.fill();
    ctx.globalCompositeOperation='source-over';
    ctx.fillStyle='#ffcf6a';
    ell(fx,fy,3+Math.sin(t*9+r)*1.2,5+Math.cos(t*8+r)*1.5); ctx.fill();
  }
  for(const ty of [wy,wy+wh]){
    ctx.fillStyle='#5d5478'; ell(wx+ww/2,ty,cell*0.32,cell*0.26); ctx.fill();
    ctx.fillStyle='#3d3554';
    ctx.beginPath(); ctx.moveTo(wx+ww/2-cell*0.3,ty);
    ctx.lineTo(wx+ww/2,ty-cell*0.42); ctx.lineTo(wx+ww/2+cell*0.3,ty); ctx.fill();
    const wav=Math.sin(t*5)*3;
    ctx.strokeStyle='#c9bdf0'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(wx+ww/2,ty-cell*0.42); ctx.lineTo(wx+ww/2,ty-cell*0.68); ctx.stroke();
    ctx.fillStyle='#ff6b6b';
    ctx.beginPath(); ctx.moveTo(wx+ww/2,ty-cell*0.68);
    ctx.lineTo(wx+ww/2+14+wav,ty-cell*0.63); ctx.lineTo(wx+ww/2,ty-cell*0.58); ctx.fill();
  }
  ctx.fillStyle='#2a2138';
  ctx.beginPath(); ctx.moveTo(wx+ww*0.2,wy+wh); ctx.lineTo(wx+ww*0.2,wy+wh-cell*0.45);
  ctx.arc(wx+ww*0.5,wy+wh-cell*0.45,ww*0.3,Math.PI,0);
  ctx.lineTo(wx+ww*0.8,wy+wh); ctx.fill();
}

// ==================== بدن مشترک ====================
function drawLegs(x,y,s,sway,skin,skin2,shoe){
  limb(x-s*0.09,y+s*0.10,x-s*0.105+sway*0.7,y+s*0.28,s*0.125,skin);
  limb(x+s*0.09,y+s*0.10,x+s*0.105+sway*0.7,y+s*0.28,s*0.125,skin);
  limb(x-s*0.105+sway*0.7,y+s*0.28,x-s*0.115+sway*1.5,y+s*0.40,s*0.085,skin2);
  limb(x+s*0.105+sway*0.7,y+s*0.28,x+s*0.115+sway*1.5,y+s*0.40,s*0.085,skin2);
  if(shoe){
    ctx.fillStyle=shoe;
    ell(x-s*0.12+sway*1.6,y+s*0.415,s*0.055,s*0.032); ctx.fill();
    ell(x+s*0.12+sway*1.6,y+s*0.415,s*0.055,s*0.032); ctx.fill();
  }
}

function drawTorso(x,y,s,skin){
  ctx.fillStyle=skin;
  ctx.beginPath();
  ctx.moveTo(x-s*0.135,y-s*0.17);
  ctx.quadraticCurveTo(x-s*0.155,y-s*0.02,x-s*0.082,y+s*0.07);
  ctx.quadraticCurveTo(x-s*0.185,y+s*0.13,x-s*0.125,y+s*0.19);
  ctx.lineTo(x+s*0.125,y+s*0.19);
  ctx.quadraticCurveTo(x+s*0.185,y+s*0.13,x+s*0.082,y+s*0.07);
  ctx.quadraticCurveTo(x+s*0.155,y-s*0.02,x+s*0.135,y-s*0.17);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle='rgba(180,110,80,0.22)'; ctx.lineWidth=s*0.012;
  ctx.beginPath(); ctx.moveTo(x-s*0.07,y+s*0.075); ctx.quadraticCurveTo(x,y+s*0.10,x+s*0.07,y+s*0.075); ctx.stroke();
}

function drawBottom(x,y,s,c){
  ctx.fillStyle=c;
  ctx.beginPath();
  ctx.moveTo(x-s*0.135,y+s*0.085);
  ctx.lineTo(x+s*0.135,y+s*0.085);
  ctx.lineTo(x+s*0.085,y+s*0.165);
  ctx.lineTo(x,y+s*0.20);
  ctx.lineTo(x-s*0.085,y+s*0.165);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle=c; ctx.lineWidth=s*0.022; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(x-s*0.135,y+s*0.085); ctx.lineTo(x-s*0.15,y+s*0.125); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x+s*0.135,y+s*0.085); ctx.lineTo(x+s*0.15,y+s*0.125); ctx.stroke();
}

function drawBust(x,y,s,size,jig,skin,cover,bare){
  const by=y-s*0.115+jig, r=size*s*0.115;
  ctx.fillStyle='rgba(170,100,80,0.25)';
  ell(x-s*0.075,by+r*0.75,r*0.95,r*0.42); ctx.fill();
  ell(x+s*0.075,by+r*0.75,r*0.95,r*0.42); ctx.fill();
  ctx.fillStyle=skin;
  ell(x-s*0.083,by,r,r*0.94); ctx.fill();
  ell(x+s*0.083,by,r,r*0.94); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.35)';
  ell(x-s*0.115,by-r*0.35,r*0.3,r*0.22); ctx.fill();
  ell(x+s*0.05,by-r*0.35,r*0.3,r*0.22); ctx.fill();
  if(bare){
    ctx.fillStyle='rgba(196,110,105,0.85)';
    ell(x-s*0.075,by+r*0.1,r*0.19,r*0.22); ctx.fill();
    ell(x+s*0.075,by+r*0.1,r*0.19,r*0.22); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.5)';
    ell(x-s*0.075,by+r*0.05,r*0.07,r*0.08); ctx.fill();
    ell(x+s*0.075,by+r*0.05,r*0.07,r*0.08); ctx.fill();
  }
  if(cover){
    ctx.fillStyle=cover;
    ctx.beginPath();
    ctx.moveTo(x-s*0.155,by-r*0.5);
    ctx.quadraticCurveTo(x,by-r*0.12,x+s*0.155,by-r*0.5);
    ctx.quadraticCurveTo(x+s*0.17,by+r*0.55,x+s*0.08,by+r*0.78);
    ctx.quadraticCurveTo(x,by+r*0.92,x-s*0.08,by+r*0.78);
    ctx.quadraticCurveTo(x-s*0.17,by+r*0.55,x-s*0.155,by-r*0.5);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,0.2)'; ctx.lineWidth=s*0.01;
    ctx.beginPath(); ctx.moveTo(x,by-r*0.15); ctx.lineTo(x,by+r*0.85); ctx.stroke();
  }
}

function drawPubic(x,y,s){
  ctx.fillStyle='rgba(120,70,80,0.5)';
  ctx.beginPath();
  ctx.moveTo(x-s*0.045,y+s*0.135);
  ctx.lineTo(x+s*0.045,y+s*0.135);
  ctx.lineTo(x,y+s*0.185);
  ctx.closePath(); ctx.fill();
}

function drawFace(x,hy,s,o){
  const eye=o.eye||'#4a2a66';
  for(const sx of [-1,1]){
    const ex=x+sx*s*0.062;
    ctx.fillStyle='#fff'; ell(ex,hy+s*0.012,s*0.043,s*0.052); ctx.fill();
    ctx.fillStyle=eye; ell(ex,hy+s*0.018,s*0.029,s*0.038); ctx.fill();
    ctx.fillStyle='#180d20'; ell(ex,hy+s*0.024,s*0.014,s*0.02); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.95)'; ell(ex-s*0.012,hy,s*0.012,s*0.014); ctx.fill();
    ctx.strokeStyle='rgba(30,15,40,0.85)'; ctx.lineWidth=s*0.013; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(ex-s*0.045,hy-s*0.03); ctx.quadraticCurveTo(ex,hy-s*0.058,ex+s*0.045,hy-s*0.028); ctx.stroke();
  }
  ctx.fillStyle='rgba(255,110,150,'+(o.blush||0.4)+')';
  ell(x-s*0.1,hy+s*0.062,s*0.033,s*0.019); ctx.fill();
  ell(x+s*0.1,hy+s*0.062,s*0.033,s*0.019); ctx.fill();
  ctx.strokeStyle='#c2506b'; ctx.lineWidth=s*0.011; ctx.lineCap='round';
  if(o.open){
    ctx.fillStyle='#8f2b3f';
    ell(x,hy+s*0.075,s*0.022,s*0.026); ctx.fill();
  }else{
    ctx.beginPath(); ctx.arc(x,hy+s*0.068,s*0.026,0.18*Math.PI,0.82*Math.PI); ctx.stroke();
  }
}

// ==================== کاراکترهای نگهبان ====================
function drawChar(type,x,y,s,st){
  const t=st.anim||0, jig=(st.jig||0), rec=st.recoil||0;
  const strip=st.strip||0;
  const bob=Math.sin(t*2.2)*s*0.018;
  const yb=y+bob;
  const sway=Math.sin(t*1.7)*s*0.045;
  const mated=!!st.mate;
  if(!mated){ ctx.fillStyle='rgba(0,0,0,0.3)'; ell(x,y+s*0.44,s*0.19,s*0.05); ctx.fill(); }
  ctx.save();
  const faceOpt={blush:mated?0.75:(strip>=1?0.55:0.4),open:mated};

  if(type==='flower'){
    ctx.globalCompositeOperation='lighter';
    const ag=ctx.createRadialGradient(x,yb,s*0.04,x,yb,s*0.5);
    ag.addColorStop(0,'rgba(255,225,150,0.2)'); ag.addColorStop(1,'rgba(255,180,120,0)');
    ctx.fillStyle=ag; ell(x,yb,s*0.5,s*0.55); ctx.fill();
    ctx.globalCompositeOperation='source-over';
    ctx.fillStyle='#ff7fbf';
    ctx.beginPath();
    ctx.moveTo(x-s*0.15,yb-s*0.33);
    ctx.quadraticCurveTo(x-s*0.32+sway,yb-s*0.05,x-s*0.22+sway*1.6,yb+s*0.24);
    ctx.quadraticCurveTo(x-s*0.06,yb+s*0.12,x,yb+s*0.26);
    ctx.quadraticCurveTo(x+s*0.06,yb+s*0.12,x+s*0.22+sway*1.6,yb+s*0.24);
    ctx.quadraticCurveTo(x+s*0.32+sway,yb-s*0.05,x+s*0.15,yb-s*0.33);
    ctx.closePath(); ctx.fill();
    drawLegs(x,yb,s,sway,SKIN,SKIN2,'#8fd98f');
    drawTorso(x,yb,s,SKIN);
    if(strip<2) drawBottom(x,yb,s,'#5ec46a');
    else drawPubic(x,yb,s);
    drawBust(x,yb,s,1.15,jig,SKIN,strip<1?'#5ec46a':null,strip>=1);
    limb(x-s*0.14,yb-s*0.15,x-s*0.235,yb+s*0.02,s*0.075,SKIN);
    limb(x+s*0.14,yb-s*0.15,x+s*0.22-rec*s*0.05,yb-s*0.02,s*0.075,SKIN);
    const hy=yb-s*0.30;
    ctx.fillStyle=SKIN; ell(x,hy,s*0.135,s*0.15); ctx.fill();
    drawFace(x,hy,s,Object.assign({eye:'#2f7d4a'},faceOpt));
    ctx.fillStyle='#ff8fc4';
    ctx.beginPath();
    ctx.moveTo(x-s*0.145,hy-s*0.02);
    ctx.quadraticCurveTo(x-s*0.16,hy-s*0.16,x,hy-s*0.175);
    ctx.quadraticCurveTo(x+s*0.16,hy-s*0.16,x+s*0.145,hy-s*0.02);
    ctx.quadraticCurveTo(x+s*0.10,hy-s*0.075,x+s*0.05,hy-s*0.10);
    ctx.quadraticCurveTo(x,hy-s*0.04,x-s*0.05,hy-s*0.10);
    ctx.quadraticCurveTo(x-s*0.10,hy-s*0.075,x-s*0.145,hy-s*0.02);
    ctx.fill();
    for(let i=-2;i<=2;i++){
      const fx=x+i*s*0.062, fy=hy-s*0.155+Math.abs(i)*s*0.018;
      ctx.fillStyle=i%2?'#ffe9a3':'#ff9d5c';
      for(let k=0;k<5;k++){
        const a=k/5*Math.PI*2+t*0.4;
        ell(fx+Math.cos(a)*s*0.022,fy+Math.sin(a)*s*0.022,s*0.014,s*0.014); ctx.fill();
      }
      ctx.fillStyle='#fff6c9'; ell(fx,fy,s*0.009,s*0.009); ctx.fill();
    }
    if(!mated){
      const gx=x+s*0.24, gy=yb-s*0.05+Math.sin(t*3)*s*0.02;
      ctx.globalCompositeOperation='lighter';
      const gg=ctx.createRadialGradient(gx,gy,1,gx,gy,s*0.14);
      gg.addColorStop(0,'rgba(255,235,160,0.85)'); gg.addColorStop(1,'rgba(255,180,90,0)');
      ctx.fillStyle=gg; ell(gx,gy,s*0.14,s*0.14); ctx.fill();
      ctx.globalCompositeOperation='source-over';
      ctx.fillStyle='#fff3c4'; ell(gx,gy,s*0.028,s*0.028); ctx.fill();
    }
  }

  else if(type==='archer'){
    ctx.fillStyle='#7b3fbf';
    ctx.beginPath();
    ctx.moveTo(x-s*0.14,yb-s*0.32);
    ctx.quadraticCurveTo(x-s*0.3,yb-s*0.1,x-s*0.24+sway*1.4,yb+s*0.18);
    ctx.quadraticCurveTo(x-s*0.1,yb+s*0.06,x,yb+s*0.2);
    ctx.quadraticCurveTo(x+s*0.1,yb+s*0.06,x+s*0.16,yb+s*0.14);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x-s*0.09,yb-s*0.34);
    ctx.quadraticCurveTo(x-s*0.32+sway*2,yb-s*0.2,x-s*0.34+sway*2.4,yb+s*0.10);
    ctx.quadraticCurveTo(x-s*0.2,yb-s*0.14,x-s*0.09,yb-s*0.34);
    ctx.fill();
    drawLegs(x,yb,s,sway,SKIN,SKIN2,'#2f7d8c');
    drawTorso(x,yb,s,SKIN);
    if(strip<2) drawBottom(x,yb,s,'#1f6f80');
    else drawPubic(x,yb,s);
    ctx.strokeStyle='#8a5a2b'; ctx.lineWidth=s*0.022;
    ctx.beginPath(); ctx.moveTo(x-s*0.19,yb+s*0.28); ctx.lineTo(x-s*0.02,yb+s*0.26); ctx.stroke();
    drawBust(x,yb,s,1.2,jig,SKIN,strip<1?'#2a8fa3':null,strip>=1);
    limb(x-s*0.14,yb-s*0.15,x-s*0.22,yb+s*0.04,s*0.072,SKIN);
    limb(x+s*0.14,yb-s*0.15,x+s*0.23-rec*s*0.06,yb-s*0.03,s*0.072,SKIN);
    const hy=yb-s*0.30;
    ctx.fillStyle=SKIN; ell(x,hy,s*0.135,s*0.15); ctx.fill();
    drawFace(x,hy,s,Object.assign({eye:'#6a3fb0'},faceOpt));
    ctx.fillStyle='#8a4fd0';
    ctx.beginPath();
    ctx.moveTo(x-s*0.145,hy-s*0.01);
    ctx.quadraticCurveTo(x-s*0.165,hy-s*0.165,x,hy-s*0.18);
    ctx.quadraticCurveTo(x+s*0.165,hy-s*0.165,x+s*0.145,hy-s*0.01);
    ctx.quadraticCurveTo(x+s*0.09,hy-s*0.09,x+s*0.04,hy-s*0.11);
    ctx.quadraticCurveTo(x-s*0.01,hy-s*0.05,x-s*0.06,hy-s*0.11);
    ctx.quadraticCurveTo(x-s*0.11,hy-s*0.08,x-s*0.145,hy-s*0.01);
    ctx.fill();
    ctx.fillStyle=SKIN;
    ctx.beginPath(); ctx.moveTo(x-s*0.13,hy-s*0.02); ctx.lineTo(x-s*0.235,hy-s*0.13); ctx.lineTo(x-s*0.115,hy+s*0.045); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+s*0.13,hy-s*0.02); ctx.lineTo(x+s*0.235,hy-s*0.13); ctx.lineTo(x+s*0.115,hy+s*0.045); ctx.fill();
    const bx=x+s*0.26-rec*s*0.05, by=yb-s*0.02;
    ctx.strokeStyle='#9c6b33'; ctx.lineWidth=s*0.035; ctx.lineCap='round';
    ctx.beginPath(); ctx.arc(bx,by,s*0.21,-Math.PI/2.3,Math.PI/2.3); ctx.stroke();
    ctx.strokeStyle='#e8d9b0'; ctx.lineWidth=s*0.014;
    const a1=-Math.PI/2.3, a2=Math.PI/2.3;
    ctx.beginPath();
    ctx.moveTo(bx+Math.cos(a1)*s*0.21,by+Math.sin(a1)*s*0.21);
    ctx.lineTo(bx+Math.cos(a2)*s*0.21,by+Math.sin(a2)*s*0.21);
    ctx.stroke();
    if(st.target&&!mated){
      ctx.strokeStyle='#f2e6c4'; ctx.lineWidth=s*0.016;
      ctx.beginPath(); ctx.moveTo(bx-rec*s*0.14,by); ctx.lineTo(bx+s*0.15,by); ctx.stroke();
      ctx.fillStyle='#cfd4dc';
      ctx.beginPath(); ctx.moveTo(bx+s*0.15,by-s*0.03); ctx.lineTo(bx+s*0.22,by); ctx.lineTo(bx+s*0.15,by+s*0.03); ctx.fill();
    }
    ctx.fillStyle='#8a5a2b'; rr(x-s*0.27,yb-s*0.2,s*0.07,s*0.24,s*0.03); ctx.fill();
    ctx.strokeStyle='#cfd4dc'; ctx.lineWidth=s*0.012;
    for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(x-s*0.245+i*s*0.022,yb-s*0.22); ctx.lineTo(x-s*0.245+i*s*0.022,yb-s*0.30); ctx.stroke(); }
  }

  else if(type==='wall'){
    const stone='#b9b3c9', stone2='#8f89a8', stone3='#6e6885';
    drawLegs(x,yb,s,sway*0.4,stone,stone2,'#5b556e');
    drawTorso(x,yb,s,stone);
    if(strip<2) drawBottom(x,yb,s,stone2);
    else drawPubic(x,yb,s);
    drawBust(x,yb,s,1.3,jig,stone,strip<1?stone3:null,strip>=1);
    ctx.strokeStyle='rgba(0,0,0,0.3)'; ctx.lineWidth=s*0.012;
    if(strip<1){
      ctx.beginPath(); ctx.moveTo(x-s*0.13,yb-s*0.20); ctx.lineTo(x-s*0.15,yb+s*0.02); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+s*0.13,yb-s*0.20); ctx.lineTo(x+s*0.15,yb+s*0.02); ctx.stroke();
    }
    limb(x-s*0.15,yb-s*0.15,x-s*0.235,yb+s*0.02,s*0.085,stone2);
    limb(x+s*0.15,yb-s*0.15,x+s*0.235,yb-s*0.02,s*0.085,stone2);
    ctx.fillStyle=stone3;
    ell(x-s*0.185,yb-s*0.17,s*0.085,s*0.06); ctx.fill();
    ell(x+s*0.185,yb-s*0.17,s*0.085,s*0.06); ctx.fill();
    const hy=yb-s*0.30;
    ctx.fillStyle=stone; ell(x,hy,s*0.135,s*0.15); ctx.fill();
    drawFace(x,hy,s,Object.assign({eye:'#6fd88a'},faceOpt));
    ctx.fillStyle=stone3;
    ctx.beginPath();
    ctx.moveTo(x-s*0.145,hy-s*0.02);
    ctx.quadraticCurveTo(x-s*0.16,hy-s*0.17,x,hy-s*0.185);
    ctx.quadraticCurveTo(x+s*0.16,hy-s*0.17,x+s*0.145,hy-s*0.02);
    ctx.quadraticCurveTo(x+s*0.1,hy-s*0.10,x,hy-s*0.09);
    ctx.quadraticCurveTo(x-s*0.1,hy-s*0.10,x-s*0.145,hy-s*0.02);
    ctx.fill();
    ctx.fillStyle='#7ee081';
    ell(x-s*0.1,hy-s*0.16,s*0.03,s*0.016); ctx.fill();
    ell(x+s*0.07,hy-s*0.18,s*0.024,s*0.013); ctx.fill();
    if(st.hp!==undefined&&st.maxHp&&st.hp<st.maxHp*0.6){
      ctx.strokeStyle='rgba(40,30,60,0.55)'; ctx.lineWidth=s*0.012;
      ctx.beginPath(); ctx.moveTo(x+s*0.05,hy-s*0.12); ctx.lineTo(x+s*0.02,hy-s*0.02); ctx.lineTo(x+s*0.07,hy+s*0.05); ctx.stroke();
    }
    if(!mated){
      const sx2=x+s*0.3, sy2=yb+s*0.02;
      const sg=ctx.createLinearGradient(sx2-s*0.12,sy2-s*0.28,sx2+s*0.12,sy2+s*0.28);
      sg.addColorStop(0,'#cfc9dd'); sg.addColorStop(1,'#7d7694');
      ctx.fillStyle=sg;
      ctx.beginPath();
      ctx.moveTo(sx2-s*0.13,sy2-s*0.28);
      ctx.lineTo(sx2+s*0.13,sy2-s*0.28);
      ctx.lineTo(sx2+s*0.15,sy2+s*0.1);
      ctx.quadraticCurveTo(sx2,sy2+s*0.36,sx2-s*0.15,sy2+s*0.1);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle='#5b556e'; ctx.lineWidth=s*0.02; ctx.stroke();
      ctx.fillStyle='#7ee081';
      ell(sx2,sy2+s*0.02,s*0.032,s*0.036); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.35)';
      ell(sx2-s*0.06,sy2-s*0.16,s*0.03,s*0.06); ctx.fill();
    }
  }

  else if(type==='mage'){
    ctx.globalCompositeOperation='lighter';
    const ag2=ctx.createRadialGradient(x,yb,s*0.05,x,yb,s*0.42);
    ag2.addColorStop(0,'rgba(255,150,70,0.22)'); ag2.addColorStop(1,'rgba(255,90,40,0)');
    ctx.fillStyle=ag2; ell(x,yb,s*0.42,s*0.5); ctx.fill();
    ctx.globalCompositeOperation='source-over';
    ctx.fillStyle='#e8462f';
    ctx.beginPath();
    ctx.moveTo(x-s*0.15,yb-s*0.33);
    ctx.quadraticCurveTo(x-s*0.33+sway,yb-s*0.02,x-s*0.24+sway*1.7,yb+s*0.26);
    ctx.quadraticCurveTo(x-s*0.05,yb+s*0.14,x,yb+s*0.28);
    ctx.quadraticCurveTo(x+s*0.05,yb+s*0.14,x+s*0.24+sway*1.7,yb+s*0.26);
    ctx.quadraticCurveTo(x+s*0.33+sway,yb-s*0.02,x+s*0.15,yb-s*0.33);
    ctx.closePath(); ctx.fill();
    drawLegs(x,yb,s,sway,SKIN,SKIN2,'#7a2b8f');
    drawTorso(x,yb,s,SKIN);
    if(strip<2) drawBottom(x,yb,s,'#7a2b8f');
    else drawPubic(x,yb,s);
    ctx.fillStyle='#7a2b8f';
    ctx.beginPath();
    ctx.moveTo(x-s*0.15,yb-s*0.16);
    ctx.quadraticCurveTo(x-s*0.21,yb+s*0.1,x-s*0.22,yb+s*0.30);
    ctx.lineTo(x-s*0.06,yb+s*0.30);
    ctx.quadraticCurveTo(x-s*0.05,yb+s*0.02,x-s*0.06,yb-s*0.14);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x+s*0.15,yb-s*0.16);
    ctx.quadraticCurveTo(x+s*0.21,yb+s*0.1,x+s*0.22,yb+s*0.30);
    ctx.lineTo(x+s*0.06,yb+s*0.30);
    ctx.quadraticCurveTo(x+s*0.05,yb+s*0.02,x+s*0.06,yb-s*0.14);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle='#b04be0';
    ctx.beginPath(); ctx.moveTo(x-s*0.15,yb-s*0.16); ctx.lineTo(x-s*0.22,yb+s*0.30); ctx.lineTo(x-s*0.17,yb+s*0.30); ctx.lineTo(x-s*0.1,yb-s*0.14); ctx.fill();
    drawBust(x,yb,s,1.25,jig,SKIN,strip<1?'#a33cc9':null,strip>=1);
    limb(x-s*0.14,yb-s*0.15,x-s*0.23,yb+s*0.03,s*0.07,SKIN);
    limb(x+s*0.14,yb-s*0.15,x+s*0.235-rec*s*0.05,yb-s*0.05,s*0.07,SKIN);
    const hy=yb-s*0.30;
    ctx.fillStyle=SKIN; ell(x,hy,s*0.135,s*0.15); ctx.fill();
    drawFace(x,hy,s,Object.assign({eye:'#d1402c'},faceOpt));
    ctx.fillStyle='#f2563c';
    ctx.beginPath();
    ctx.moveTo(x-s*0.145,hy-s*0.01);
    ctx.quadraticCurveTo(x-s*0.165,hy-s*0.165,x,hy-s*0.18);
    ctx.quadraticCurveTo(x+s*0.165,hy-s*0.165,x+s*0.145,hy-s*0.01);
    ctx.quadraticCurveTo(x+s*0.08,hy-s*0.08,x+s*0.03,hy-s*0.12);
    ctx.quadraticCurveTo(x-s*0.03,hy-s*0.06,x-s*0.08,hy-s*0.11);
    ctx.quadraticCurveTo(x-s*0.12,hy-s*0.07,x-s*0.145,hy-s*0.01);
    ctx.fill();
    ctx.fillStyle='#4a1a6b';
    ctx.beginPath(); ctx.ellipse(x,hy-s*0.13,s*0.24,s*0.05,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x-s*0.14,hy-s*0.14);
    ctx.quadraticCurveTo(x+s*0.02,hy-s*0.4,x+s*0.12,hy-s*0.62);
    ctx.quadraticCurveTo(x+s*0.14,hy-s*0.36,x+s*0.14,hy-s*0.14);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle='#ffd76a'; ell(x-s*0.01,hy-s*0.28,s*0.024,s*0.024); ctx.fill();
    if(!mated){
      const px2=x+s*0.26-rec*s*0.04, py2=yb-s*0.4;
      ctx.strokeStyle='#6b4a2f'; ctx.lineWidth=s*0.032;
      ctx.beginPath(); ctx.moveTo(x+s*0.24,yb+s*0.28); ctx.lineTo(px2,py2); ctx.stroke();
      ctx.globalCompositeOperation='lighter';
      const fg2=ctx.createRadialGradient(px2,py2,1,px2,py2,s*0.2);
      fg2.addColorStop(0,'rgba(255,215,120,'+(0.8+0.2*Math.sin(t*9))+')'); fg2.addColorStop(1,'rgba(255,110,40,0)');
      ctx.fillStyle=fg2; ell(px2,py2,s*0.2,s*0.2); ctx.fill();
      ctx.globalCompositeOperation='source-over';
      ctx.fillStyle='#ffe9a3'; ell(px2,py2+s*0.02,s*0.03,s*0.05); ctx.fill();
    }
  }

  if(st.flash>0){
    ctx.globalAlpha=st.flash*0.5; ctx.fillStyle='#fff';
    ell(x,yb-s*0.06,s*0.28,s*0.3); ctx.fill(); ctx.globalAlpha=1;
  }
  ctx.restore();
}

function drawUnit(u,t,alpha,s){
  s=s||cell;
  if(u.mate){
    ctx.save();
    ctx.translate(u.x,u.y+s*0.14);
    ctx.rotate(-1.05);
    ctx.translate(-u.x,-(u.y+s*0.14));
    ctx.save(); if(alpha!==undefined) ctx.globalAlpha=alpha;
    drawChar(u.type,u.x,u.y,s,u);
    ctx.restore();
    ctx.restore();
    return;
  }
  ctx.save();
  if(alpha!==undefined) ctx.globalAlpha=alpha;
  drawChar(u.type,u.x,u.y,s,u);
  ctx.restore();
}

// ==================== دشمنان ====================
function drawFoe(type,x,y,s,st){
  const d=EDEF[type], t=st.anim||0, jig=st.jig||0;
  const r=d.r*s;
  const wob=Math.sin(t*8+st.seed);
  const bob=Math.sin(t*2.4+st.seed)*s*0.014;
  const yb=y+bob;
  const S1=d.color, S2=d.c2;
  ctx.fillStyle='rgba(0,0,0,0.32)'; ell(x,y+2,r*0.85,r*0.22); ctx.fill();
  ctx.save();

  if(type==='ghoul'){
    const th=st.mating?Math.sin(t*11)*0.5:0;
    ctx.fillStyle='rgba(60,90,30,0.4)';
    for(const sx of [-1,1]){
      ctx.beginPath();
      ctx.moveTo(x+sx*r*0.55,yb-r*0.95);
      ctx.quadraticCurveTo(x+sx*r*1.6,yb-r*1.5,x+sx*r*1.3,yb-r*0.45);
      ctx.quadraticCurveTo(x+sx*r*0.95,yb-r*0.6,x+sx*r*0.55,yb-r*0.7);
      ctx.fill();
    }
    limb(x-r*0.42,yb+r*0.35,x-r*0.5+wob*3,yb+r*0.95,r*0.3,S2);
    limb(x+r*0.42,yb+r*0.35,x+r*0.5-wob*3,yb+r*0.95,r*0.3,S2);
    const g=ctx.createLinearGradient(x,yb-r*1.4,x,yb+r*0.5);
    g.addColorStop(0,S1); g.addColorStop(1,S2);
    ctx.fillStyle=g;
    ctx.beginPath();
    ctx.moveTo(x-r*0.6,yb-r*1.0);
    ctx.quadraticCurveTo(x-r*0.75,yb-r*0.2,x-r*0.4,yb+r*0.1);
    ctx.quadraticCurveTo(x-r*0.8,yb+r*0.35,x-r*0.55,yb+r*0.55);
    ctx.lineTo(x+r*0.55,yb+r*0.55);
    ctx.quadraticCurveTo(x+r*0.8,yb+r*0.35,x+r*0.4,yb+r*0.1);
    ctx.quadraticCurveTo(x+r*0.75,yb-r*0.2,x+r*0.6,yb-r*1.0);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.12)';
    ell(x,yb-r*0.35,r*0.4,r*0.45); ctx.fill();
    ctx.fillStyle=S2;
    ell(x-r*0.2,yb-r*0.42,r*0.15,r*0.12); ctx.fill();
    ell(x+r*0.2,yb-r*0.42,r*0.15,r*0.12); ctx.fill();
    limb(x-r*0.6,yb-r*0.85,x-r*0.95,yb-r*0.25+wob*4,r*0.19,S2);
    limb(x+r*0.6,yb-r*0.85,x+r*0.95,yb-r*0.25-wob*4,r*0.19,S2);
    const hy=yb-r*1.25;
    ctx.fillStyle=S1; ell(x,hy,r*0.42,r*0.44); ctx.fill();
    ctx.fillStyle='#e8dcae';
    ctx.beginPath(); ctx.moveTo(x-r*0.32,hy-r*0.3); ctx.lineTo(x-r*0.66,hy-r*0.62); ctx.lineTo(x-r*0.14,hy-r*0.4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+r*0.32,hy-r*0.3); ctx.lineTo(x+r*0.66,hy-r*0.62); ctx.lineTo(x+r*0.14,hy-r*0.4); ctx.fill();
    for(const sx of [-1,1]){
      const ex=x+sx*r*0.17;
      ctx.fillStyle='#ffe9a3'; ell(ex,hy+r*0.02,r*0.11,r*0.09); ctx.fill();
      ctx.fillStyle='#2a1a00'; ell(ex,hy+r*0.03,r*0.045,r*0.05); ctx.fill();
      ctx.strokeStyle=S2; ctx.lineWidth=r*0.05; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(ex-sx*r*0.13,hy-r*0.16); ctx.lineTo(ex+sx*r*0.1,hy-r*0.06); ctx.stroke();
    }
    ctx.fillStyle='#3d1a10';
    ctx.beginPath(); ctx.arc(x,hy+r*0.22,r*0.15,0.05*Math.PI,0.95*Math.PI); ctx.fill();
    ctx.fillStyle='#fff';
    ctx.beginPath(); ctx.moveTo(x-r*0.11,hy+r*0.22); ctx.lineTo(x-r*0.08,hy+r*0.36); ctx.lineTo(x-r*0.04,hy+r*0.22); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+r*0.04,hy+r*0.22); ctx.lineTo(x+r*0.08,hy+r*0.36); ctx.lineTo(x+r*0.11,hy+r*0.22); ctx.fill();
    const cx0=x-r*0.42, cy0=yb+r*0.42;
    const tipX=st.mating?x-r*1.15+th*r*0.35:x-r*0.72;
    const tipY=st.mating?yb+r*0.12+Math.abs(th)*r*0.05:yb+r*0.72;
    ctx.fillStyle='#d99a86';
    ell(cx0+r*0.02,cy0+r*0.12,r*0.16,r*0.13); ctx.fill();
    ell(cx0+r*0.16,cy0+r*0.14,r*0.13,r*0.11); ctx.fill();
    limb(cx0,cy0,tipX,tipY,r*0.28,'#e8a893');
    ctx.fillStyle='#f0b8a4'; ell(tipX,tipY,r*0.16,r*0.15); ctx.fill();
    ctx.strokeStyle='rgba(150,80,70,0.5)'; ctx.lineWidth=r*0.03;
    ctx.beginPath(); ctx.moveTo(cx0,cy0); ctx.lineTo(tipX,tipY); ctx.stroke();
  } else {
    ctx.fillStyle='rgba(60,20,50,0.55)';
    const flap=Math.sin(t*9+st.seed)*0.3;
    for(const sx of [-1,1]){
      ctx.beginPath();
      ctx.moveTo(x+sx*r*0.5,yb-r*0.9);
      ctx.quadraticCurveTo(x+sx*r*(1.7+flap),yb-r*1.5,x+sx*r*(1.5+flap),yb-r*0.4);
      ctx.quadraticCurveTo(x+sx*r*1.1,yb-r*0.55,x+sx*r*0.5,yb-r*0.7);
      ctx.fill();
    }
    limb(x-r*0.3,yb+r*0.3,x-r*0.35+wob*3,yb+r*0.85,r*0.22,S2);
    limb(x+r*0.3,yb+r*0.3,x+r*0.35-wob*3,yb+r*0.85,r*0.22,S2);
    const g=ctx.createLinearGradient(x,yb-r*1.3,x,yb+r*0.5);
    g.addColorStop(0,S1); g.addColorStop(1,S2);
    ctx.fillStyle=g;
    ctx.beginPath();
    ctx.moveTo(x-r*0.42,yb-r*0.95);
    ctx.quadraticCurveTo(x-r*0.5,yb-r*0.3,x-r*0.26,yb+r*0.05);
    ctx.quadraticCurveTo(x-r*0.55,yb+r*0.25,x-r*0.38,yb+r*0.42);
    ctx.lineTo(x+r*0.38,yb+r*0.42);
    ctx.quadraticCurveTo(x+r*0.55,yb+r*0.25,x+r*0.26,yb+r*0.05);
    ctx.quadraticCurveTo(x+r*0.5,yb-r*0.3,x+r*0.42,yb-r*0.95);
    ctx.closePath(); ctx.fill();
    const bs=type==='brute'?1.5:1.0;
    drawBust(x,yb-r*0.1,s,bs,jig,S1,type==='brute'?'#4a2a5e':'rgba(35,10,30,0.55)',false);
    limb(x-r*0.45,yb-r*0.8,x-r*0.72,yb-r*0.15+wob*4,r*0.16,S2);
    limb(x+r*0.45,yb-r*0.8,x+r*0.72,yb-r*0.15-wob*4,r*0.16,S2);
    const hy=yb-r*1.2;
    ctx.fillStyle=S1; ell(x,hy,r*0.46,r*0.5); ctx.fill();
    ctx.fillStyle='#f5e9c9';
    ctx.beginPath(); ctx.moveTo(x-r*0.36,hy-r*0.34); ctx.lineTo(x-r*0.62,hy-r*0.86); ctx.lineTo(x-r*0.18,hy-r*0.44); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+r*0.36,hy-r*0.34); ctx.lineTo(x+r*0.62,hy-r*0.86); ctx.lineTo(x+r*0.18,hy-r*0.44); ctx.fill();
    ctx.fillStyle=S2;
    ctx.beginPath();
    ctx.moveTo(x-r*0.46,hy-r*0.1);
    ctx.quadraticCurveTo(x-r*0.5,hy-r*0.55,x,hy-r*0.56);
    ctx.quadraticCurveTo(x+r*0.5,hy-r*0.55,x+r*0.46,hy-r*0.1);
    ctx.quadraticCurveTo(x+r*0.3,hy-r*0.3,x,hy-r*0.28);
    ctx.quadraticCurveTo(x-r*0.3,hy-r*0.3,x-r*0.46,hy-r*0.1);
    ctx.fill();
    for(const sx of [-1,1]){
      const ex=x+sx*r*0.2;
      ctx.fillStyle='#fff'; ell(ex,hy+r*0.02,r*0.13,r*0.16); ctx.fill();
      ctx.fillStyle='#c00'; ell(ex,hy+r*0.05,r*0.08,r*0.11); ctx.fill();
      ctx.fillStyle='#2a0000'; ell(ex,hy+r*0.06,r*0.04,r*0.06); ctx.fill();
      ctx.fillStyle='#fff'; ell(ex-r*0.03,hy-r*0.02,r*0.035,r*0.04); ctx.fill();
      ctx.strokeStyle=S2; ctx.lineWidth=r*0.055; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(ex-sx*r*0.15,hy-r*0.2); ctx.lineTo(ex+sx*r*0.1,hy-r*0.1); ctx.stroke();
    }
    ctx.fillStyle='#4d0f1d';
    ctx.beginPath(); ctx.arc(x,hy+r*0.24,r*0.13,0.05*Math.PI,0.95*Math.PI); ctx.fill();
    ctx.fillStyle='#fff';
    ctx.beginPath(); ctx.moveTo(x-r*0.09,hy+r*0.25); ctx.lineTo(x-r*0.06,hy+r*0.36); ctx.lineTo(x-r*0.03,hy+r*0.25); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+r*0.03,hy+r*0.25); ctx.lineTo(x+r*0.06,hy+r*0.36); ctx.lineTo(x+r*0.09,hy+r*0.25); ctx.fill();
    ctx.strokeStyle=S2; ctx.lineWidth=r*0.1;
    ctx.beginPath(); ctx.moveTo(x+r*0.4,yb+r*0.35);
    ctx.quadraticCurveTo(x+r*0.95,yb+r*0.55+Math.sin(t*5)*r*0.2,x+r*0.75,yb+r*0.95);
    ctx.stroke();
    ctx.fillStyle=S2;
    ctx.beginPath(); ctx.moveTo(x+r*0.75,yb+r*0.95); ctx.lineTo(x+r*0.92,yb+r*0.85); ctx.lineTo(x+r*0.72,yb+r*1.05); ctx.fill();
    if(type==='brute'){
      const ang=-0.6+Math.sin(t*6)*0.15;
      const hx2=x-r*1.1, hy2=yb-r*0.3;
      limb(x-r*0.72,yb-r*0.15,hx2,hy2,r*0.13,'#5a4632');
      ctx.fillStyle='#7a6a55';
      ell(hx2+Math.cos(ang)*s*0.12,hy2+Math.sin(ang)*s*0.12,s*0.13,s*0.15); ctx.fill();
    }
    if(type==='runner'){
      ctx.strokeStyle='rgba(255,180,90,0.5)'; ctx.lineWidth=2;
      for(let i=0;i<3;i++){
        ctx.beginPath(); ctx.moveTo(x+r*1.1+i*5,yb-r*(0.3+i*0.28)); ctx.lineTo(x+r*1.5+i*5,yb-r*(0.3+i*0.28)); ctx.stroke();
      }
    }
  }

  if(st.flash>0){
    ctx.globalAlpha=st.flash*0.6; ctx.fillStyle='#fff';
    ell(x,yb-r*0.5,r*0.75,r*0.85); ctx.fill(); ctx.globalAlpha=1;
  }
  ctx.restore();
  if(st.hp!==undefined&&st.maxHp&&st.hp<st.maxHp){
    const bw=r*2.1, ratio=Math.max(0,st.hp/st.maxHp);
    ctx.fillStyle='rgba(0,0,0,0.55)'; rr(x-bw/2,y-r*1.95,bw,5,2.5); ctx.fill();
    ctx.fillStyle=ratio>0.5?'#7ee081':(ratio>0.25?'#ffd76a':'#ff6b6b');
    rr(x-bw/2,y-r*1.95,bw*ratio,5,2.5); ctx.fill();
  }
}
function drawEnemy(e,t){ drawFoe(e.type,e.x,e.y,cell,e); }

// ==================== سایر کشش‌ها ====================
function drawOrb(o,t){
  const pul=1+0.12*Math.sin(t*4+o.seed);
  ctx.globalCompositeOperation='lighter';
  const g=ctx.createRadialGradient(o.x,o.y,1,o.x,o.y,cell*0.4*pul);
  g.addColorStop(0,'rgba(255,230,140,0.85)'); g.addColorStop(0.4,'rgba(255,200,90,0.3)'); g.addColorStop(1,'rgba(255,200,90,0)');
  ctx.fillStyle=g; ell(o.x,o.y,cell*0.4*pul,cell*0.4*pul); ctx.fill();
  ctx.globalCompositeOperation='source-over';
  ctx.fillStyle='#fff3c4'; ell(o.x,o.y,cell*0.11,cell*0.11); ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.9)'; ctx.lineWidth=1.5;
  const a=t*2+o.seed;
  ctx.beginPath();
  ctx.moveTo(o.x-Math.cos(a)*7,o.y-Math.sin(a)*7); ctx.lineTo(o.x+Math.cos(a)*7,o.y+Math.sin(a)*7);
  ctx.moveTo(o.x-Math.sin(a)*7,o.y+Math.cos(a)*7); ctx.lineTo(o.x+Math.sin(a)*7,o.y-Math.cos(a)*7);
  ctx.stroke();
  if(o.landed&&o.life<2){
    ctx.globalAlpha=Math.min(1,o.life/2)*(0.5+0.5*Math.sin(t*10));
    ctx.strokeStyle='#ffd76a'; ctx.lineWidth=2;
    ell(o.x,o.y,cell*0.2,cell*0.2); ctx.stroke(); ctx.globalAlpha=1;
  }
}
function drawProj(p){
  if(p.kind==='arrow'){
    ctx.strokeStyle='#e8d9b0'; ctx.lineWidth=2.5; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(p.x-cell*0.14,p.y); ctx.lineTo(p.x+cell*0.1,p.y); ctx.stroke();
    ctx.fillStyle='#cfd4dc';
    ctx.beginPath(); ctx.moveTo(p.x+cell*0.1,p.y-3); ctx.lineTo(p.x+cell*0.18,p.y); ctx.lineTo(p.x+cell*0.1,p.y+3); ctx.fill();
  }else{
    ctx.globalCompositeOperation='lighter';
    const g=ctx.createRadialGradient(p.x,p.y,1,p.x,p.y,cell*0.22);
    g.addColorStop(0,'rgba(255,240,180,0.95)'); g.addColorStop(0.5,'rgba(255,140,60,0.6)'); g.addColorStop(1,'rgba(255,100,40,0)');
    ctx.fillStyle=g; ell(p.x,p.y,cell*0.22,cell*0.22); ctx.fill();
    ctx.globalCompositeOperation='source-over';
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
function drawGhost(t){
  if(!G.sel||!G.hover) return;
  const c=G.hover;
  if(c.row<0||c.row>=ROWS||c.col<0||c.col>=COLS) return;
  const ok=!G.grid[c.row][c.col]&&G.light>=UNITS[G.sel].cost&&G.cds[G.sel]<=0;
  const x=ox+c.col*cell,y=oy+c.row*cell;
  ctx.fillStyle=ok?'rgba(126,224,129,0.22)':'rgba(255,107,107,0.25)';
  rr(x+2,y+2,cell-4,cell-4,cell*0.12); ctx.fill();
  ctx.strokeStyle=ok?'#7ee081':'#ff6b6b'; ctx.lineWidth=2; ctx.stroke();
  drawUnit({type:G.sel,row:c.row,col:c.col,x:colX(c.col),y:rowY(c.row),anim:0,flash:0,recoil:0,target:null,jig:0,hp:1,maxHp:1,strip:0},t,0.55);
}
function drawAnn(){
  ctx.textAlign='center';
  let i=0;
  for(const a of G.ann){
    const al=Math.min(1,a.t/0.5);
    ctx.globalAlpha=al;
    ctx.font='900 34px Tahoma';
    ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillText(a.text,W/2+2,H*0.32+2-i*44);
    const g=ctx.createLinearGradient(W/2-100,0,W/2+100,0);
    g.addColorStop(0,'#ffd76a'); g.addColorStop(1,'#ff9d5c');
    ctx.fillStyle=g; ctx.fillText(a.text,W/2,H*0.32-i*44);
    i++;
  }
  ctx.globalAlpha=1;
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
