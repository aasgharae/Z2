// ==================== پیکربندی ====================
const COLS=9, ROWS=5;
const POSES=['anal','vag','oral'];
const canvas=document.getElementById('cv');
let ctx=canvas.getContext('2d');
let W=0,H=0,DPR=1,cell=0,ox=0,oy=0;

function isRot(){ return document.documentElement.classList.contains('rot'); }

function orient(){
  const portrait=window.innerHeight>window.innerWidth;
  document.documentElement.classList.toggle('rot',portrait);
  setTimeout(resize,30);
}
function resize(){
  const st=document.getElementById('stage');
  const w=st.offsetWidth||window.innerWidth;
  const h=st.offsetHeight||window.innerHeight;
  DPR=Math.min(window.devicePixelRatio||1,2);
  W=w; H=h;
  canvas.width=Math.round(W*DPR); canvas.height=Math.round(H*DPR);
  canvas.style.width=W+'px'; canvas.style.height=H+'px';
  ctx.setTransform(DPR,0,0,DPR,0,0);
  cell=Math.min(W*0.97/(COLS+0.9), H*0.96/ROWS);
  ox=(W-cell*COLS)/2;
  oy=(H-cell*ROWS)/2;
}
window.addEventListener('resize',function(){ orient(); });
window.addEventListener('orientationchange',function(){ setTimeout(function(){ orient(); resize(); },250); });
orient();
resize();

// ==================== واحدهای بازیکن ====================
const UNITS={
  flower:  {name:'دوشیزه نور',  cost:50,  hp:90,  color:'#7ee081', cd:3},
  archer:  {name:'کماندار',     cost:100, hp:110, dmg:22, rate:1.25, color:'#5ec8d8', cd:4},
  wall:    {name:'سنگ‌سپر',     cost:50,  hp:460, color:'#b8b2c9', cd:5},
  mage:    {name:'جادوگر آتش',  cost:175, hp:100, dmg:42, rate:2.1, splash:52, color:'#c58bff', cd:6},
  succubus:{name:'ساکوبوس',     cost:150, hp:130, dmg:9,  rate:1.6, slow:0.4, color:'#e05f9e', cd:7},
  nun:     {name:'راهبه',       cost:200, hp:150, heal:9,  color:'#ffe08a', cd:8},
  hunter:  {name:'شکارچی',      cost:225, hp:120, dmg:58, rate:1.5, range:2.6, color:'#b8d94a', cd:9},
};

// ==================== دشمنان ====================
const EDEF={
  div:   {hp:120, spd:13, dmg:14, rate:1.0, r:0.30, color:'#e05252', c2:'#8f2b3f', score:1},
  runner:{hp:70,  spd:27, dmg:10, rate:0.8, r:0.26, color:'#f0923e', c2:'#a04a12', score:1},
  brute: {hp:430, spd:9,  dmg:26, rate:1.3, r:0.42, color:'#a14be0', c2:'#5d2b8f', score:3},
  ghoul: {hp:620, spd:8,  dmg:0,  rate:1,   r:0.52, color:'#8aa84f', c2:'#4c6b25', score:6, fuck:true, fuckTime:3.0},
  boss:  {hp:2400,spd:5.5,dmg:0,  rate:1,   r:0.78, color:'#c9779f', c2:'#7a3a5c', score:25, fuck:true, fuckTime:3.8, boss:true},
};

// ==================== صراحت بر اساس موج ====================
function heatStrip(){
  if(G.wave<=2) return 0;
  return Math.min(2.6,(G.wave-2)*0.52);
}

// ==================== ابزارهای رسم ====================
function rr(x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}
function ell(x,y,rx,ry){ ctx.beginPath(); ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2); }
function limb(x1,y1,x2,y2,w,c){
  ctx.strokeStyle=c; ctx.lineWidth=w; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
}
const STARS=Array.from({length:80},()=>({x:Math.random(),y:Math.random()*0.5,r:0.5+Math.random()*1.4,p:Math.random()*7}));
