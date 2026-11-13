// ==================== صدا ====================
let actx=null, muted=false;
function beep(freq,dur,type,vol){
  if(muted) return;
  try{
    if(!actx) actx=new (window.AudioContext||window.webkitAudioContext)();
    if(actx.state==='suspended') actx.resume();
    const o=actx.createOscillator(), g=actx.createGain();
    o.type=type||'sine'; o.frequency.value=freq;
    g.gain.setValueAtTime(vol||0.1,actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+dur);
    o.connect(g); g.connect(actx.destination);
    o.start(); o.stop(actx.currentTime+dur);
  }catch(e){}
}
function chord(fs,dur,type,vol){ fs.forEach((f,i)=>setTimeout(()=>beep(f,dur,type,vol),i*90)); }
