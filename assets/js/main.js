// ── CURSOR ──
const cur=document.getElementById('cur'),ring=document.getElementById('cur-ring'),glow=document.getElementById('cur-glow');
let mx=0,my=0,rx=0,ry=0,gx=0,gy=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function animCursor(){
  rx+=(mx-rx)*0.14;ry+=(my-ry)*0.14;
  if(ring) { ring.style.left=rx+'px';ring.style.top=ry+'px'; }
  gx+=(mx-gx)*0.07;gy+=(my-gy)*0.07;
  if(glow) { glow.style.left=gx+'px';glow.style.top=gy+'px'; }
  requestAnimationFrame(animCursor);
})();
document.querySelectorAll('a,button,.edu-card,.cert-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    if(ring) { ring.style.transform='translate(-50%,-50%) scale(2.2)';ring.style.opacity='0.25'; }
    if(cur) cur.style.transform='translate(-50%,-50%) scale(0.5)';
  });
  el.addEventListener('mouseleave',()=>{
    if(ring) { ring.style.transform='translate(-50%,-50%) scale(1)';ring.style.opacity='0.5'; }
    if(cur) cur.style.transform='translate(-50%,-50%) scale(1)';
  });
});

// ── NAV SCROLL ──
window.addEventListener('scroll',()=>{
  const nav = document.getElementById('nav');
  if(nav) nav.classList.toggle('scrolled',window.scrollY>60);
});

// ── REVEAL ON SCROLL ──
const revObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

// ── CAREER TABS ──
function switchTab(i){
  document.querySelectorAll('.ctab').forEach((t,j)=>t.classList.toggle('active',i===j));
  document.querySelectorAll('.cpanel').forEach((p,j)=>p.classList.toggle('active',i===j));
}

// ── SKILL BARS ──
document.querySelectorAll('.skill-fill').forEach(b=>{b.style.transform='scaleX(0)';});
const skillObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-fill').forEach(b=>{
        b.style.transform='scaleX('+b.getAttribute('data-w')+')';
      });
    }
  });
},{threshold:0.3});
const cvCard=document.querySelector('.cv-card');
if(cvCard)skillObs.observe(cvCard);

// ── TYPING EFFECT on hero ──
const heroH=document.querySelector('.hero-h');
if(heroH){
  heroH.style.opacity='1';
}

// ── PARALLAX on hero image ──
window.addEventListener('scroll',()=>{
  const sy=window.scrollY;
  const imgBox=document.querySelector('.hero-img-box img');
  if(imgBox)imgBox.style.transform=`translateY(${sy*0.08}px)`;
});
// Scroll Progress
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const sp = document.getElementById('scroll-progress');
  if(sp) sp.style.width = scrolled + "%";
});
// ── CARD TILT EFFECT ──
document.querySelectorAll('.edu-card, .cert-card').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    el.style.transform = `perspective(1000px) rotateY(${dx / 20}deg) rotateX(${-dy / 20}deg) translateY(-10px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'none';
  });
});

// ── MAGNETIC BUTTONS ──
document.querySelectorAll('.btn-accent, .nav-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'none';
  });
});

// ── PDF DOWNLOAD ──
function downloadPDF() {
  const element = document.body;
  const opt = {
    margin: [0, 0],
    filename: 'Ishara_Kumarage_Portfolio.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 1.5, useCORS: true, logging: false, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  const nav = document.getElementById('nav');
  const scroll = document.getElementById('scroll-progress');
  const blobs = document.querySelectorAll('.blob-1, .blob-2, .float-icon, #cur, #cur-ring, #cur-glow');
  
  if(nav) nav.style.display = 'none';
  if(scroll) scroll.style.display = 'none';
  blobs.forEach(b => b.style.display = 'none');
  
  html2pdf().set(opt).from(element).save().then(() => {
    if(nav) nav.style.display = 'flex';
    if(scroll) scroll.style.display = 'block';
    blobs.forEach(b => b.style.display = 'block');
  });
}
