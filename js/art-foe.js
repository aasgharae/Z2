function drawFoe(type,x,y,s,st){
  const d=EDEF[type], t=st.anim||0, jig=st.jig||0;
  const r=d.r*s;
  const wob=Math.sin(t*8+st.seed);
  const bob=Math.sin(t*2.4+st.seed)*s*0.014;
  const yb=y+bob;
  const S1=d.color, S2=d.c2;
  ctx.fillStyle='rgba(0,0,0,0.34)'; ell(x,y+2,r*0.9,r*0.24); ctx.fill();
  ctx.save();

  if(type==='ghoul'||type==='boss'){
    const isB=d.boss;
    const th=st.mating?Math.sin(t*11)*0.5:0;
    const pose=st.pose||'anal';
    ctx.fillStyle='rgba(50,80,30,0.4)';
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
    ctx.quadraticCurveTo(x-r*0.78,yb-r*0.2,x-r*0.4,yb+r*0.1);
    ctx.quadraticCurveTo(x-r*0.82,yb+r*0.35,x-r*0.55,yb+r*0.55);
    ctx.lineTo(x+r*0.55,yb+r*0.55);
    ctx.quadraticCurveTo(x+r*0.82,yb+r*0.35,x+r*0.4,yb+r*0.1);
    ctx.quadraticCurveTo(x+r*0.78,yb-r*0.2,x+r*0.6,yb-r*1.0);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.13)';
    ell(x,yb-r*0.35,r*0.4,r*0.45); ctx.fill();
    if(isB){
      const bs=1.75, br=bs*s*0.118, bby=yb-r*0.3;
      ctx.fillStyle=S1;
      ell(x-r*0.22,bby,br,br*0.95); ctx.fill();
      ell(x+r*0.22,bby,br,br*0.95); ctx.fill();
      ctx.fillStyle='rgba(150,60,90,0.9)';
      ell(x-r*0.25,bby+br*0.15,br*0.2,br*0.24); ctx.fill();
      ell(x+r*0.19,bby+br*0.15,br*0.2,br*0.24); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.3)';
      ell(x-r*0.3,bby-br*0.3,br*0.3,br*0.22); ctx.fill();
      ell(x+r*0.14,bby-br*0.3,br*0.3,br*0.22); ctx.fill();
      ctx.fillStyle='#6b2f4a'; ell(x,yb+r*0.2,s*0.02,s*0.024); ctx.fill();
    }else{
      ctx.fillStyle=S2;
      ell(x-r*0.2,yb-r*0.42,r*0.15,r*0.12); ctx.fill();
      ell(x+r*0.2,yb-r*0.42,r*0.15,r*0.12); ctx.fill();
    }
    limb(x-r*0.6,yb-r*0.85,x-r*0.95,yb-r*0.25+wob*4,r*0.19,S2);
    limb(x+r*0.6,yb-r*0.85,x+r*0.95,yb-r*0.25-wob*4,r*0.19,S2);
    const hy=yb-r*1.25;
    ctx.fillStyle=S1; ell(x,hy,r*0.42,r*0.44); ctx.fill();
    ctx.fillStyle='#e8dcae';
    ctx.beginPath(); ctx.moveTo(x-r*0.32,hy-r*0.3); ctx.lineTo(x-r*0.66,hy-r*0.62); ctx.lineTo(x-r*0.14,hy-r*0.4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+r*0.32,hy-r*0.3); ctx.lineTo(x+r*0.66,hy-r*0.62); ctx.lineTo(x+r*0.14,hy-r*0.4); ctx.fill();
    if(isB){
      ctx.fillStyle='#2a1d47';
      ctx.beginPath();
      ctx.moveTo(x-r*0.44,hy-r*0.06);
      ctx.quadraticCurveTo(x-r*0.5,hy-r*0.55,x,hy-r*0.56);
      ctx.quadraticCurveTo(x+r*0.5,hy-r*0.55,x+r*0.44,hy-r*0.06);
      ctx.quadraticCurveTo(x+r*0.26,hy-r*0.32,x,hy-r*0.3);
      ctx.quadraticCurveTo(x-r*0.26,hy-r*0.32,x-r*0.44,hy-r*0.06);
      ctx.fill();
      ctx.fillStyle='#e8dcae'; ell(x,hy-s*0.02,s*0.022,s*0.022); ctx.fill();
    }
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

    if(st.mating&&pose!=='oral'){
      const cx0=x-r*0.42, cy0=yb+r*0.42;
      const tipX=x-r*1.15+th*r*0.35, tipY=yb+r*(pose==='vag'?0.3:0.12)+Math.abs(th)*r*0.05;
      ctx.fillStyle='#d99a86';
      ell(cx0+r*0.02,cy0+r*0.12,r*0.16,r*0.13); ctx.fill();
      ell(cx0+r*0.16,cy0+r*0.14,r*0.13,r*0.11); ctx.fill();
      limb(cx0,cy0,tipX,tipY,r*0.28,'#e8a893');
      ctx.fillStyle='#f0b8a4'; ell(tipX,tipY,r*0.16,r*0.15); ctx.fill();
    }
    if(isB&&st.mating&&pose==='oral'){
      const dx=x-r*0.95, dy=yb+r*0.05;
      ctx.strokeStyle='#b0446b'; ctx.lineWidth=r*0.24; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(x-r*0.55,yb+r*0.3); ctx.lineTo(dx,dy); ctx.stroke();
      ctx.fillStyle='#d05a86'; ell(dx,dy,r*0.15,r*0.14); ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,0.3)'; ctx.lineWidth=r*0.04;
      ctx.beginPath(); ctx.moveTo(x-r*0.7,yb+r*0.2); ctx.lineTo(dx-r*0.02,dy-r*0.02); ctx.stroke();
    }
    if(isB){
      const dx=x+r*0.75, dy=yb+r*0.05;
      if(!st.mating||pose!=='oral'){
        ctx.strokeStyle='#b0446b'; ctx.lineWidth=r*0.22; ctx.lineCap='round';
        ctx.beginPath(); ctx.moveTo(x+r*0.6,yb+r*0.35); ctx.lineTo(dx,dy); ctx.stroke();
        ctx.fillStyle='#d05a86'; ell(dx,dy,r*0.14,r*0.13); ctx.fill();
      }
      ctx.fillStyle='#b0446b'; ell(dx,dy,r*0.03,r*0.03); ctx.fill();
    }
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
    drawBust(x,yb-r*0.1,s,type==='brute'?1.5:1.0,jig,S1,type==='brute'?'#4a2a5e':'rgba(35,10,30,0.55)',false);
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
      ctx.strokeStyle=S2; ctx.lineWidth=r*0.055;
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
    if(type==='brute'){
      const ang=-0.6+Math.sin(t*6)*0.15;
      limb(x-r*0.72,yb-r*0.15,x-r*1.1,yb-r*0.3,r*0.13,'#5a4632');
      ctx.fillStyle='#7a6a55';
      ell(x-r*1.1+Math.cos(ang)*s*0.12,yb-r*0.3+Math.sin(ang)*s*0.12,s*0.13,s*0.15); ctx.fill();
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
