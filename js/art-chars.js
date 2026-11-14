// ==================== پالت کاراکترها ====================
const CHARDEF={
  flower:  {skin:SKIN,skin2:SKIN2,hair:'#ff8fc4',hair2:'#ff6fb6',eye:'#2f7d4a',top:'#5ec46a',bot:'#5ec46a',shoe:'#8fd98f',bust:1.15,acc:'flower'},
  archer:  {skin:SKIN,skin2:SKIN2,hair:'#8a4fd0',hair2:'#7b3fbf',eye:'#6a3fb0',top:'#2a8fa3',bot:'#1f6f80',shoe:'#2f7d8c',bust:1.2,acc:'archer'},
  wall:    {skin:STONE,skin2:STONE2,hair:STONE3,hair2:'#5b556e',eye:'#6fd88a',top:STONE3,bot:STONE2,shoe:'#5b556e',bust:1.3,acc:'wall'},
  mage:    {skin:SKIN,skin2:SKIN2,hair:'#f2563c',hair2:'#e8462f',eye:'#d1402c',top:'#a33cc9',bot:'#7a2b8f',shoe:'#7a2b8f',bust:1.25,acc:'mage'},
  succubus:{skin:'#ffc4d8',skin2:'#e79ab8',hair:'#3a2a5e',hair2:'#2a1d47',eye:'#ff4d8d',top:'#e0407f',bot:'#b32a63',shoe:'#8a1f4d',bust:1.35,acc:'succubus'},
  nun:     {skin:SKIN,skin2:SKIN2,hair:'#3f4a63',hair2:'#2c3549',eye:'#4d6bb0',top:'#e8e2f5',bot:'#cfc7e6',shoe:'#8f89a8',bust:1.2,acc:'nun'},
  hunter:  {skin:'#f0cfa8',skin2:'#d9b189',hair:'#5d7a2e',hair2:'#47601f',eye:'#8fb03a',top:'#6b8f34',bot:'#4a6622',shoe:'#3a4f1a',bust:1.2,acc:'hunter'},
};

// ==================== مو ====================
function hairBack(cfg,x,y,s,sway){
  ctx.fillStyle=cfg.hair2;
  ctx.beginPath();
  ctx.moveTo(x-s*0.15,y-s*0.33);
  ctx.quadraticCurveTo(x-s*0.33+sway,y-s*0.04,x-s*0.23+sway*1.7,y+s*0.26);
  ctx.quadraticCurveTo(x-s*0.06,y+s*0.13,x,y+s*0.28);
  ctx.quadraticCurveTo(x+s*0.06,y+s*0.13,x+s*0.23+sway*1.7,y+s*0.26);
  ctx.quadraticCurveTo(x+s*0.33+sway,y-s*0.04,x+s*0.15,y-s*0.33);
  ctx.closePath(); ctx.fill();
}
function hairFront(cfg,x,hy,s){
  ctx.fillStyle=cfg.hair;
  ctx.beginPath();
  ctx.moveTo(x-s*0.147,hy-s*0.008);
  ctx.quadraticCurveTo(x-s*0.168,hy-s*0.168,x,hy-s*0.183);
  ctx.quadraticCurveTo(x+s*0.168,hy-s*0.168,x+s*0.147,hy-s*0.008);
  ctx.quadraticCurveTo(x+s*0.09,hy-s*0.088,x+s*0.04,hy-s*0.112);
  ctx.quadraticCurveTo(x-s*0.01,hy-s*0.05,x-s*0.06,hy-s*0.112);
  ctx.quadraticCurveTo(x-s*0.112,hy-s*0.082,x-s*0.147,hy-s*0.008);
  ctx.fill();
  ctx.strokeStyle=cfg.hair2; ctx.lineWidth=s*0.012;
  ctx.beginPath(); ctx.moveTo(x-s*0.09,hy-s*0.16); ctx.quadraticCurveTo(x-s*0.06,hy-s*0.06,x-s*0.05,hy-s*0.01); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x+s*0.06,hy-s*0.17); ctx.quadraticCurveTo(x+s*0.04,hy-s*0.06,x+s*0.05,hy-s*0.01); ctx.stroke();
}

// ==================== لوازم ====================
function drawAcc(cfg,x,yb,s,hy,t,rec,mode){
  const a=cfg.acc;
  if(a==='flower'){
    for(let i=-2;i<=2;i++){
      const fx=x+i*s*0.062, fy=hy-s*0.158+Math.abs(i)*s*0.018;
      ctx.fillStyle=i%2?'#ffe9a3':'#ff9d5c';
      for(let k=0;k<5;k++){
        const ang=k/5*Math.PI*2+t*0.4;
        ell(fx+Math.cos(ang)*s*0.023,fy+Math.sin(ang)*s*0.023,s*0.015,s*0.015); ctx.fill();
      }
      ctx.fillStyle='#fff6c9'; ell(fx,fy,s*0.01,s*0.01); ctx.fill();
    }
    if(mode!=='back'&&mode!=='oral'){
      const gx=x+s*0.25, gy=yb-s*0.05+Math.sin(t*3)*s*0.02;
      glow(gx,gy,s*0.15,'255,235,160',0.8);
      ctx.fillStyle='#fff3c4'; ell(gx,gy,s*0.03,s*0.03); ctx.fill();
    }
  }
  else if(a==='archer'){
    ctx.fillStyle=cfg.skin;
    ctx.beginPath(); ctx.moveTo(x-s*0.132,hy-s*0.02); ctx.lineTo(x-s*0.24,hy-s*0.135); ctx.lineTo(x-s*0.117,hy+s*0.048); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+s*0.132,hy-s*0.02); ctx.lineTo(x+s*0.24,hy-s*0.135); ctx.lineTo(x+s*0.117,hy+s*0.048); ctx.fill();
    if(mode!=='back'&&mode!=='oral'){
      const bx=x+s*0.27-rec*s*0.05, by=yb-s*0.02;
      ctx.strokeStyle='#9c6b33'; ctx.lineWidth=s*0.036; ctx.lineCap='round';
      ctx.beginPath(); ctx.arc(bx,by,s*0.215,-Math.PI/2.3,Math.PI/2.3); ctx.stroke();
      ctx.strokeStyle='#e8d9b0'; ctx.lineWidth=s*0.014;
      const a1=-Math.PI/2.3, a2=Math.PI/2.3;
      ctx.beginPath();
      ctx.moveTo(bx+Math.cos(a1)*s*0.215,by+Math.sin(a1)*s*0.215);
      ctx.lineTo(bx+Math.cos(a2)*s*0.215,by+Math.sin(a2)*s*0.215);
      ctx.stroke();
      if(rec>0.2){
        ctx.fillStyle='#cfd4dc';
        ctx.beginPath(); ctx.moveTo(bx+s*0.15,by-s*0.03); ctx.lineTo(bx+s*0.23,by); ctx.lineTo(bx+s*0.15,by+s*0.03); ctx.fill();
      }
      ctx.fillStyle='#8a5a2b'; rr(x-s*0.28,yb-s*0.2,s*0.07,s*0.25,s*0.03); ctx.fill();
      ctx.strokeStyle='#cfd4dc'; ctx.lineWidth=s*0.013;
      for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(x-s*0.255+i*s*0.023,yb-s*0.22); ctx.lineTo(x-s*0.255+i*s*0.023,yb-s*0.31); ctx.stroke(); }
    }
  }
  else if(a==='wall'){
    ctx.fillStyle=STONE3;
    ell(x-s*0.188,yb-s*0.175,s*0.088,s*0.062); ctx.fill();
    ell(x+s*0.188,yb-s*0.175,s*0.088,s*0.062); ctx.fill();
    if(mode!=='back'&&mode!=='oral'){
      const sx2=x+s*0.31, sy2=yb+s*0.02;
      const sg=ctx.createLinearGradient(sx2-s*0.12,sy2-s*0.28,sx2+s*0.12,sy2+s*0.28);
      sg.addColorStop(0,'#cfc9dd'); sg.addColorStop(1,'#7d7694');
      ctx.fillStyle=sg;
      ctx.beginPath();
      ctx.moveTo(sx2-s*0.13,sy2-s*0.28); ctx.lineTo(sx2+s*0.13,sy2-s*0.28);
      ctx.lineTo(sx2+s*0.15,sy2+s*0.1);
      ctx.quadraticCurveTo(sx2,sy2+s*0.36,sx2-s*0.15,sy2+s*0.1);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle='#5b556e'; ctx.lineWidth=s*0.02; ctx.stroke();
      ctx.fillStyle='#7ee081'; ell(sx2,sy2+s*0.02,s*0.032,s*0.036); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.35)'; ell(sx2-s*0.06,sy2-s*0.16,s*0.03,s*0.06); ctx.fill();
    }
  }
  else if(a==='mage'){
    ctx.fillStyle='#4a1a6b';
    ctx.beginPath(); ctx.ellipse(x,hy-s*0.132,s*0.245,s*0.052,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x-s*0.145,hy-s*0.142);
    ctx.quadraticCurveTo(x+s*0.02,hy-s*0.4,x+s*0.125,hy-s*0.63);
    ctx.quadraticCurveTo(x+s*0.145,hy-s*0.37,x+s*0.145,hy-s*0.142);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle='#ffd76a'; ell(x-s*0.01,hy-s*0.285,s*0.025,s*0.025); ctx.fill();
    if(mode!=='back'&&mode!=='oral'){
      const px2=x+s*0.27-rec*s*0.04, py2=yb-s*0.4;
      ctx.strokeStyle='#6b4a2f'; ctx.lineWidth=s*0.033;
      ctx.beginPath(); ctx.moveTo(x+s*0.25,yb+s*0.28); ctx.lineTo(px2,py2); ctx.stroke();
      glow(px2,py2,s*0.21,'255,215,120',0.75+0.2*Math.sin(t*9));
      ctx.fillStyle='#ffe9a3'; ell(px2,py2+s*0.02,s*0.032,s*0.052); ctx.fill();
    }
  }
  else if(a==='succubus'){
    ctx.fillStyle='#2a1d47';
    for(const sx of [-1,1]){
      ctx.beginPath();
      ctx.moveTo(x+sx*s*0.13,yb-s*0.2);
      ctx.quadraticCurveTo(x+sx*s*0.42,yb-s*0.5,x+sx*s*0.34,yb-s*0.02);
      ctx.quadraticCurveTo(x+sx*s*0.22,yb-s*0.16,x+sx*s*0.13,yb-s*0.12);
      ctx.fill();
    }
    ctx.fillStyle='#8a1f4d';
    ctx.beginPath(); ctx.moveTo(x-s*0.06,hy-s*0.16); ctx.lineTo(x-s*0.1,hy-s*0.3); ctx.lineTo(x-s*0.02,hy-s*0.17); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+s*0.06,hy-s*0.16); ctx.lineTo(x+s*0.1,hy-s*0.3); ctx.lineTo(x+s*0.02,hy-s*0.17); ctx.fill();
    if(mode!=='back'){
      ctx.strokeStyle='#8a1f4d'; ctx.lineWidth=s*0.02;
      ctx.beginPath(); ctx.moveTo(x+s*0.14,yb+s*0.18);
      ctx.quadraticCurveTo(x+s*0.34,yb+s*0.3+Math.sin(t*4)*s*0.04,x+s*0.28,yb+s*0.04);
      ctx.stroke();
    }
  }
  else if(a==='nun'){
    ctx.fillStyle='#f4f0ff';
    ctx.beginPath();
    ctx.moveTo(x-s*0.155,hy-s*0.02);
    ctx.quadraticCurveTo(x-s*0.175,hy-s*0.2,x,hy-s*0.21);
    ctx.quadraticCurveTo(x+s*0.175,hy-s*0.2,x+s*0.155,hy-s*0.02);
    ctx.quadraticCurveTo(x+s*0.1,hy-s*0.11,x,hy-s*0.1);
    ctx.quadraticCurveTo(x-s*0.1,hy-s*0.11,x-s*0.155,hy-s*0.02);
    ctx.fill();
    ctx.fillStyle='#2c3549';
    ell(x,hy-s*0.2,s*0.1,s*0.045); ctx.fill();
    ctx.strokeStyle='#ffd76a'; ctx.lineWidth=s*0.012;
    ctx.beginPath(); ctx.moveTo(x,yb-s*0.14); ctx.lineTo(x,yb-s*0.05); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x-s*0.025,yb-s*0.115); ctx.lineTo(x+s*0.025,yb-s*0.115); ctx.stroke();
  }
  else if(a==='hunter'){
    ctx.fillStyle='#3a4f1a';
    ctx.beginPath(); ctx.ellipse(x,hy-s*0.15,s*0.23,s*0.048,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x,hy-s*0.185,s*0.11,s*0.075,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#8fb03a'; ctx.fillRect(x-s*0.11,hy-s*0.2,s*0.22,s*0.018);
    if(mode!=='back'&&mode!=='oral'){
      ctx.strokeStyle='#cfd4dc'; ctx.lineWidth=s*0.024; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(x-s*0.2,yb-s*0.05); ctx.lineTo(x-s*0.28,yb+s*0.1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+s*0.2,yb-s*0.05); ctx.lineTo(x+s*0.28,yb+s*0.1); ctx.stroke();
    }
  }
}

// ==================== نمای روبه‌رو ====================
function drawFront(cfg,x,y,s,st,jig,sway,rec,strip,mated,t){
  ctx.fillStyle='rgba(0,0,0,0.3)'; ell(x,y+s*0.44,s*0.19,s*0.05); ctx.fill();
  hairBack(cfg,x,y,s,sway);
  drawLegs(x,y,s,sway,cfg.skin,cfg.skin2,cfg.shoe);
  drawTorso(x,y,s,cfg.skin);
  if(strip<2) drawBottom(x,y,s,cfg.bot); else drawPubic(x,y,s);
  if(cfg.acc==='mage'&&strip<1.4){
    ctx.fillStyle=cfg.bot;
    ctx.beginPath();
    ctx.moveTo(x-s*0.152,y-s*0.16);
    ctx.quadraticCurveTo(x-s*0.215,y+s*0.1,x-s*0.225,y+s*0.3);
    ctx.lineTo(x-s*0.06,y+s*0.3);
    ctx.quadraticCurveTo(x-s*0.05,y+s*0.02,x-s*0.06,y-s*0.14);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x+s*0.152,y-s*0.16);
    ctx.quadraticCurveTo(x+s*0.215,y+s*0.1,x+s*0.225,y+s*0.3);
    ctx.lineTo(x+s*0.06,y+s*0.3);
    ctx.quadraticCurveTo(x+s*0.05,y+s*0.02,x+s*0.06,y-s*0.14);
    ctx.closePath(); ctx.fill();
  }
  if(cfg.acc==='succubus'&&strip<2.2){
    ctx.strokeStyle=cfg.top; ctx.lineWidth=s*0.03; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(x-s*0.15,y-s*0.16); ctx.lineTo(x+s*0.14,y+s*0.02); ctx.stroke();
  }
  drawBust(x,y,s,cfg.bust,jig,cfg.skin,strip<1?cfg.top:null,strip>=1);
  limb(x-s*0.14,y-s*0.15,x-s*0.24,y+s*0.02,s*0.075,cfg.skin);
  limb(x+s*0.14,y-s*0.15,x+s*0.225-rec*s*0.05,y-s*0.02,s*0.075,cfg.skin);
  const hy=y-s*0.3;
  ctx.fillStyle=cfg.skin; ell(x,hy,s*0.137,s*0.152); ctx.fill();
  drawFace(x,hy,s,{eye:cfg.eye,blush:mated?0.78:(strip>=1?0.58:0.42),open:mated});
  hairFront(cfg,x,hy,s);
  drawAcc(cfg,x,y,s,hy,t,rec,'front');
}

// ==================== نمای از پشت (خم) ====================
function drawBack(cfg,x,y,s,st,jig,strip){
  const t=st.anim||0;
  const th=Math.sin(t*9)*s*0.008;
  ctx.fillStyle='rgba(0,0,0,0.32)'; ell(x,y+s*0.4,s*0.21,s*0.055); ctx.fill();
  // پاها
  limb(x-s*0.14,y+s*0.06,x-s*0.2,y+s*0.36,s*0.13,cfg.skin);
  limb(x+s*0.14,y+s*0.06,x+s*0.2,y+s*0.36,s*0.13,cfg.skin);
  ctx.fillStyle=cfg.shoe;
  ell(x-s*0.21,y+s*0.38,s*0.06,s*0.033); ctx.fill();
  ell(x+s*0.21,y+s*0.38,s*0.06,s*0.033); ctx.fill();
  // کفل
  const by=y+s*0.06+th;
  ctx.fillStyle=cfg.skin;
  ell(x-s*0.105,by,s*0.125,s*0.135); ctx.fill();
  ell(x+s*0.105,by,s*0.125,s*0.135); ctx.fill();
  ctx.strokeStyle='rgba(150,85,70,0.5)'; ctx.lineWidth=s*0.014;
  ctx.beginPath(); ctx.moveTo(x,by-s*0.11); ctx.lineTo(x,by+s*0.1); ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,0.26)';
  ell(x-s*0.13,by-s*0.05,s*0.045,s*0.055); ctx.fill();
  ell(x+s*0.13,by-s*0.05,s*0.045,s*0.055); ctx.fill();
  // مقعد و فرج
  if(strip>=1.6){
    ctx.fillStyle='rgba(120,60,70,0.75)'; ell(x,by+s*0.03,s*0.026,s*0.02); ctx.fill();
    ctx.fillStyle='rgba(190,100,110,0.6)'; ell(x,by+s*0.115,s*0.032,s*0.024); ctx.fill();
  }
  // پوشش
  if(strip<2){
    ctx.fillStyle=cfg.bot;
    ctx.beginPath();
    ctx.moveTo(x-s*0.16,by-s*0.06);
    ctx.quadraticCurveTo(x,by+s*0.16,x+s*0.16,by-s*0.06);
    ctx.quadraticCurveTo(x,by-s*0.12,x-s*0.16,by-s*0.06);
    ctx.fill();
    if(strip>=1.2){
      ctx.fillStyle='rgba(0,0,0,0.25)'; ell(x,by+s*0.02,s*0.022,s*0.018); ctx.fill();
    }
  }
  // کمر و پشت
  ctx.fillStyle=cfg.skin;
  ctx.beginPath();
  ctx.moveTo(x-s*0.155,y-s*0.02);
  ctx.quadraticCurveTo(x-s*0.16,y-s*0.16,x-s*0.1,y-s*0.24);
  ctx.quadraticCurveTo(x,y-s*0.3,x+s*0.1,y-s*0.24);
  ctx.quadraticCurveTo(x+s*0.16,y-s*0.16,x+s*0.155,y-s*0.02);
  ctx.quadraticCurveTo(x+s*0.09,y+s*0.03,x,y+s*0.03);
  ctx.quadraticCurveTo(x-s*0.09,y+s*0.03,x-s*0.155,y-s*0.02);
  ctx.fill();
  // ستون فقرات
  ctx.strokeStyle='rgba(150,85,70,0.32)'; ctx.lineWidth=s*0.013;
  ctx.beginPath(); ctx.moveTo(x,y-s*0.26); ctx.quadraticCurveTo(x-s*0.01,y-s*0.14,x,y-s*0.02); ctx.stroke();
  // سینه‌های آویزان از پهلو
  const r=cfg.bust*s*0.1;
  ctx.fillStyle=cfg.skin;
  ell(x-s*0.15,y-s*0.1+jig*0.6,r,r*0.95); ctx.fill();
  ell(x+s*0.15,y-s*0.1+jig*0.6,r,r*0.95); ctx.fill();
  if(strip>=1){
    ctx.fillStyle='rgba(198,105,102,0.85)';
    ell(x-s*0.165,y-s*0.06+jig*0.6,r*0.2,r*0.24); ctx.fill();
    ell(x+s*0.135,y-s*0.06+jig*0.6,r*0.2,r*0.24); ctx.fill();
  }else{
    ctx.fillStyle=cfg.top;
    ell(x-s*0.15,y-s*0.1+jig*0.6,r,r*0.9); ctx.fill();
    ell(x+s*0.15,y-s*0.1+jig*0.6,r,r*0.9); ctx.fill();
  }
  // بازوها به جلو
  limb(x-s*0.15,y-s*0.2,x-s*0.21,y+s*0.02,s*0.07,cfg.skin2);
  limb(x+s*0.15,y-s*0.2,x+s*0.21,y+s*0.02,s*0.07,cfg.skin2);
  // سر افتاده
  const hy=y-s*0.31;
  ctx.fillStyle=cfg.hair2;
  ctx.beginPath();
  ctx.moveTo(x-s*0.14,hy-s*0.02);
  ctx.quadraticCurveTo(x-s*0.15,hy-s*0.16,x,hy-s*0.17);
  ctx.quadraticCurveTo(x+s*0.15,hy-s*0.16,x+s*0.14,hy-s*0.02);
  ctx.quadraticCurveTo(x+s*0.08,hy+s*0.06,x,hy+s*0.07);
  ctx.quadraticCurveTo(x-s*0.08,hy+s*0.06,x-s*0.14,hy-s*0.02);
  ctx.fill();
  ctx.fillStyle=cfg.skin; ell(x+s*0.02,hy+s*0.01,s*0.105,s*0.115); ctx.fill();
  ctx.fillStyle=cfg.hair;
  ctx.beginPath();
  ctx.moveTo(x-s*0.09,hy-s*0.02);
  ctx.quadraticCurveTo(x-s*0.11,hy-s*0.14,x+s*0.01,hy-s*0.14);
  ctx.quadraticCurveTo(x+s*0.11,hy-s*0.12,x+s*0.1,hy-s*0.01);
  ctx.quadraticCurveTo(x+s*0.03,hy-s*0.05,x-s*0.09,hy-s*0.02);
  ctx.fill();
  ctx.fillStyle='#fff'; ell(x+s*0.075,hy+s*0.01,s*0.028,s*0.033); ctx.fill();
  ctx.fillStyle=cfg.eye; ell(x+s*0.08,hy+s*0.012,s*0.017,s*0.022); ctx.fill();
  ctx.fillStyle='#1a0f22'; ell(x+s*0.083,hy+s*0.014,s*0.008,s*0.011); ctx.fill();
  ctx.fillStyle='rgba(255,105,148,0.6)'; ell(x+s*0.055,hy+s*0.055,s*0.028,s*0.016); ctx.fill();
  ctx.fillStyle='#8f2b3f'; ell(x+s*0.095,hy+s*0.062,s*0.022,s*0.024); ctx.fill();
}

// ==================== نمای ساک زدن ====================
function drawOral(cfg,x,y,s,st,jig,strip){
  const t=st.anim||0;
  const bob=Math.sin(t*10)*s*0.012;
  ctx.fillStyle='rgba(0,0,0,0.3)'; ell(x,y+s*0.4,s*0.2,s*0.05); ctx.fill();
  // ساق‌های نشسته
  ctx.fillStyle=cfg.skin2;
  ell(x-s*0.15,y+s*0.3,s*0.11,s*0.07); ctx.fill();
  ell(x+s*0.15,y+s*0.3,s*0.11,s*0.07); ctx.fill();
  ctx.fillStyle=cfg.shoe;
  ell(x-s*0.2,y+s*0.34,s*0.055,s*0.03); ctx.fill();
  ell(x+s*0.2,y+s*0.34,s*0.055,s*0.03); ctx.fill();
  // باسن روی پاشنه
  ctx.fillStyle=cfg.skin;
  ell(x,y+s*0.26,s*0.19,s*0.1); ctx.fill();
  if(strip<2){ ctx.fillStyle=cfg.bot; ell(x,y+s*0.26,s*0.19,s*0.095); ctx.fill(); }
  // تنه خم به راست
  ctx.fillStyle=cfg.skin;
  ctx.beginPath();
  ctx.moveTo(x-s*0.14,y+s*0.2);
  ctx.quadraticCurveTo(x-s*0.06,y-s*0.02,x+s*0.02,y-s*0.12+bob);
  ctx.lineTo(x+s*0.14,y-s*0.02+bob);
  ctx.quadraticCurveTo(x+s*0.1,y+s*0.16,x+s*0.12,y+s*0.22);
  ctx.closePath(); ctx.fill();
  const by=y+s*0.02+bob, r=cfg.bust*s*0.105;
  ctx.fillStyle=cfg.skin;
  ell(x-s*0.03,by,r,r*0.95); ctx.fill();
  ell(x+s*0.09,by+r*0.15,r,r*0.9); ctx.fill();
  if(strip>=1){
    ctx.fillStyle='rgba(198,105,102,0.85)';
    ell(x-s*0.04,by+r*0.3,r*0.2,r*0.24); ctx.fill();
    ell(x+s*0.1,by+r*0.45,r*0.2,r*0.24); ctx.fill();
  }else{
    ctx.fillStyle=cfg.top; ell(x-s*0.03,by,r,r*0.9); ctx.fill(); ell(x+s*0.09,by+r*0.15,r,r*0.85); ctx.fill();
  }
  // بازوها
  limb(x-s*0.12,y+s*0.16,x-s*0.2,y+s*0.3,s*0.07,cfg.skin2);
  limb(x+s*0.12,y+s*0.14,x+s*0.24,y+s*0.26,s*0.07,cfg.skin2);
  // سر
  const hx=x+s*0.16, hy=y-s*0.14+bob;
  ctx.fillStyle=cfg.hair2;
  ctx.beginPath(); ell(hx-s*0.02,hy,s*0.125,s*0.135); ctx.fill();
  ctx.fillStyle=cfg.skin; ell(hx,hy,s*0.108,s*0.118); ctx.fill();
  ctx.fillStyle=cfg.hair;
  ctx.beginPath();
  ctx.moveTo(hx-s*0.1,hy-s*0.02);
  ctx.quadraticCurveTo(hx-s*0.11,hy-s*0.15,hx+s*0.02,hy-s*0.15);
  ctx.quadraticCurveTo(hx+s*0.11,hy-s*0.13,hx+s*0.1,hy-s*0.01);
  ctx.quadraticCurveTo(hx+s*0.03,hy-s*0.06,hx-s*0.1,hy-s*0.02);
  ctx.fill();
  ctx.fillStyle='#fff'; ell(hx-s*0.045,hy-s*0.005,s*0.03,s*0.035); ctx.fill();
  ctx.fillStyle=cfg.eye; ell(hx-s*0.04,hy,s*0.018,s*0.024); ctx.fill();
  ctx.fillStyle='#1a0f22'; ell(hx-s*0.037,hy+s*0.002,s*0.008,s*0.011); ctx.fill();
  ctx.fillStyle='rgba(255,105,148,0.65)'; ell(hx-s*0.055,hy+s*0.05,s*0.03,s*0.018); ctx.fill();
  // دهان باز روی آلت
  ctx.fillStyle='#7d1f33'; ell(hx+s*0.075,hy+s*0.045,s*0.036,s*0.038); ctx.fill();
  ctx.fillStyle='#c05a6e'; ell(hx+s*0.06,hy+s*0.045,s*0.014,s*0.02); ctx.fill();
}

// ==================== پخش‌کننده ====================
function drawChar(type,x,y,s,st){
  const cfg=CHARDEF[type]||CHARDEF.flower;
  const strip=st.strip||0;
  const jig=st.jig||0;
  const sway=Math.sin((st.anim||0)*1.7)*s*0.045;
  const bob=Math.sin((st.anim||0)*2.2)*s*0.018;
  ctx.save();
  if(st.mate&&st.pose==='oral') drawOral(cfg,x,y+bob,s,st,jig,strip);
  else if(st.mate) drawBack(cfg,x,y+bob,s,st,jig,strip);
  else drawFront(cfg,x,y+bob,s,st,jig,sway,st.recoil||0,strip,false,st.anim||0);
  if(st.flash>0){
    ctx.globalAlpha=st.flash*0.5; ctx.fillStyle='#fff';
    ell(x,y-s*0.06,s*0.27,s*0.3); ctx.fill(); ctx.globalAlpha=1;
  }
  ctx.restore();
}

function drawUnit(u,t,alpha,s){
  s=s||cell;
  ctx.save();
  if(alpha!==undefined) ctx.globalAlpha=alpha;
  drawChar(u.type,u.x,u.y,s,u);
  ctx.restore();
}
