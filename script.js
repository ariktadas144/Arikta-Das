/* ========================================================
   DATA
   ======================================================== */
const PROJECTS = [
  { name:"Chronicle AI", subtitle:"Multimodal Institutional Memory System", when:"Jan 2026",
    image:"https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80&auto=format&fit=crop",
    href:"https://github.com/ariktadas144/Chronicle-AI",
    bullets:["Fine-tuned CLIP (ViT-B/32) via contrastive loss — +18% precision@5 over zero-shot.","Ablation studies across embeddings & Qdrant filters → sub-100ms query latency."],
    tech:["Python","CLIP","Qdrant","FastAPI"] },
  { name:"Discord Moderation Orchestrator", subtitle:"Agentic moderation pipeline", when:"Oct 2025 — Jan 2026",
    image:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80&auto=format&fit=crop",
    href:"https://github.com/SIDDHESH-2006/DiscordServerModerationOrchestrator",
    bullets:["LangChain-powered LLM agents parse commands into multi-step moderation plans.","FastAPI + Discord API automate roles, channels, and permission workflows in real-time."],
    tech:["Python","LangChain","FastAPI","Discord API"] },
  { name:"ViaMigo", subtitle:"Travel & Itinerary Assistant", when:"Sep 2025",
    image:"https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80&auto=format&fit=crop",
    href:"https://github.com/Heyaa28041/ViaMigo",
    bullets:["Full-stack features integrating 10+ third-party APIs into a responsive, data-driven UX.","React + Tailwind frontend backed by REST APIs, shipped via an Agile cross-functional team."],
    tech:["Python","JavaScript","React.js","Tailwind"] },
  { name:"Sevaverse", subtitle:"Community Service Platform", when:"Apr 2025",
    image:"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80&auto=format&fit=crop",
    href:"https://github.com/AdityaVKochar/sevaverse",
    bullets:["Scalable backend supporting 2 user roles and 20+ workflows with clean separation of concerns.","Data pipelines handling 10,000+ records per run with structured algorithmic design."],
    tech:["JavaScript","Express.js","Node.js"] },
  { name:"Data Breach Monitor", subtitle:"Security CLI Tool", when:"May 2025",
    image:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80&auto=format&fit=crop",
    href:"https://github.com/ariktadas144/data-breach-monitor",
    bullets:["Modular CLI detecting compromised credentials across large breach datasets.","Automated filtering, preprocessing, and fault-tolerant execution."],
    tech:["Python","CLI"] }
];

const SKILL_GROUPS = [
  { label:"Languages", items:["Java","Python","C / C++","JavaScript","HTML","CSS"] },
  { label:"Frameworks & Tools", items:["Node.js","Express.js","React.js","FastAPI","Streamlit","Git","GitHub","Docker","Vite"] },
  { label:"AI / ML", items:["LangChain","Hugging Face","TensorFlow","PyTorch","Scikit-learn","CLIP (ViT-B/32)"] },
  { label:"Databases", items:["MySQL","Qdrant (Vector DB)"] },
];

/* ========================================================
   LOADER — go-kart runner
   - fixed duration (~1.3s), never tied to real asset load time
   - skips instantly on click / tap / keypress
   - plays once per browser session (sessionStorage), not on
     every refresh or back-navigation within the same session
   ======================================================== */
(function(){
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loaderBarFill");
  const pct = document.getElementById("loaderPct");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // already played this session — skip immediately, no animation, no delay
  if(sessionStorage.getItem("loaderPlayed") === "1"){
    loader.remove();
    document.body.classList.remove("no-scroll");
    return;
  }
  sessionStorage.setItem("loaderPlayed", "1");

  const DURATION = reduceMotion ? 150 : 1300; // fixed cap, ~1.2–1.5s
  let done = false;
  const start = performance.now();

  function finish(){
    if(done) return;
    done = true;
    fill.style.width = "100%";
    pct.textContent = "100%";
    loader.removeEventListener("click", finish);
    window.removeEventListener("keydown", finish);
    window.removeEventListener("touchstart", finish);
    setTimeout(()=>{
      loader.classList.add("hide");
      document.body.classList.remove("no-scroll");
      setTimeout(()=> loader.remove(), 650);
    }, 150);
  }

  function tick(now){
    if(done) return;
    const elapsed = now - start;
    const progress = Math.min(100, (elapsed / DURATION) * 100);
    fill.style.width = progress + "%";
    pct.textContent = Math.round(progress) + "%";
    if(elapsed >= DURATION){ finish(); return; }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // let an impatient visitor skip straight to the site
  loader.addEventListener("click", finish);
  window.addEventListener("keydown", finish);
  window.addEventListener("touchstart", finish, { passive:true });
})();

/* ========================================================
   RENDER PROJECTS
   ======================================================== */
const projGrid = document.getElementById("projGrid");
PROJECTS.forEach(p=>{
  const el = document.createElement("div");
  el.className = "proj-card tilt";
  el.innerHTML = `
    <div class="image-mask"><img src="${p.image}" alt="${p.name}" loading="lazy"/></div>
    <div class="proj-body">
      <div class="when">${p.when}</div>
      <div class="proj-head">
        <div>
          <h3>${p.name}</h3>
          <div class="sub">${p.subtitle}</div>
        </div>
        <a class="proj-arrow" href="${p.href}" target="_blank" rel="noopener" aria-label="Open ${p.name} on GitHub">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M7 17 17 7M9 7h8v8"/></svg>
        </a>
      </div>
      <ul>${p.bullets.map(b=>`<li>${b}</li>`).join("")}</ul>
      <div class="tech-row">${p.tech.map(t=>`<span class="tech-pill">${t}</span>`).join("")}</div>
    </div>`;
  projGrid.appendChild(el);
});

/* ========================================================
   RENDER SKILLS
   ======================================================== */
const skillsGrid = document.getElementById("skillsGrid");
SKILL_GROUPS.forEach(g=>{
  const el = document.createElement("div");
  el.className = "card skill-panel";
  el.innerHTML = `
    <div class="cat-head"><span class="node"></span><h4>${g.label}</h4></div>
    <div class="skill-chips">${g.items.map(i=>`<span class="skill-chip">${i}</span>`).join("")}</div>`;
  skillsGrid.appendChild(el);
});

/* ========================================================
   SCROLL REVEAL (certificates section intentionally excluded)
   ======================================================== */
const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add("in-view"); io.unobserve(e.target); }
  });
}, { threshold:0.15 });
revealEls.forEach(el=>io.observe(el));

/* ========================================================
   NAV — active link highlight, scrolled state, mobile toggle
   ======================================================== */
const navEl = document.getElementById("siteNav");
const navLinks = document.querySelectorAll("#navLinks a");
const navLinksWrap = document.getElementById("navLinks");
const navBurger = document.getElementById("navBurger");
const sections = document.querySelectorAll("section[id]");

/* A fixed thin band near the vertical center of the viewport, rather than a
   percentage of each section's own height — this is what keeps long sections
   (like Projects, which is taller than the viewport) correctly highlighted;
   the old threshold:0.5 approach required 50% of a section's total height to
   be on-screen at once, which tall sections could never satisfy. */
const navObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(l=>l.classList.remove("active"));
      const link = document.querySelector(`#navLinks a[href="#${e.target.id}"]`);
      if(link) link.classList.add("active");
    }
  });
}, { threshold:0, rootMargin:"-45% 0px -45% 0px" });
sections.forEach(s=>navObserver.observe(s));

navBurger.addEventListener("click", ()=> navLinksWrap.classList.toggle("open"));
navLinks.forEach(l=> l.addEventListener("click", ()=> navLinksWrap.classList.remove("open")));

window.addEventListener("scroll", ()=>{
  navEl.classList.toggle("scrolled", window.scrollY > 30);
}, { passive:true });

/* ========================================================
   BACK TO TOP
   ======================================================== */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", ()=>{
  backToTop.classList.toggle("visible", window.scrollY > 600);
}, { passive:true });
backToTop.addEventListener("click", ()=> window.scrollTo({ top:0, behavior:"smooth" }));

/* ========================================================
   3D TILT ON PROJECT CARDS
   ======================================================== */
document.querySelectorAll(".tilt").forEach(card=>{
  card.addEventListener("mousemove",(e)=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - 0.5;
    const y = (e.clientY - r.top)/r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave",()=>{ card.style.transform = ""; });
});

/* ========================================================
   CONTACT FORM
   NOTE: the API key must live server-side. This posts to
   /api/contact — deploy a small serverless function there
   (Vercel/Netlify) that calls Resend using an environment
   variable. Falls back to a mailto link if that route
   isn't deployed yet.
   ======================================================== */
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  formMsg.style.color = "var(--ink-2)";
  formMsg.textContent = "Sending...";
  try{
    const res = await fetch("/api/contact", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error("no route");
    formMsg.style.color = "var(--cyan)";
    formMsg.textContent = "Message sent — thank you!";
    form.reset();
  }catch(err){
    const subject = encodeURIComponent(data.subject || `Portfolio contact from ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    window.location.href = `mailto:ariktadas144@gmail.com?subject=${subject}&body=${body}`;
    formMsg.style.color = "var(--ink-3)";
    formMsg.textContent = "Opening your email client...";
  }
});

/* ========================================================
   NEURAL NETWORK BACKGROUND — full-site, cursor responsive
   ======================================================== */
(function(){
  const canvas = document.getElementById("neuralCanvas");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W, H, DPR;
  let nodes = [];
  const mouse = { x:-9999, y:-9999, active:false };
  let scrollParallax = 0;

  function resize(){
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W*DPR; canvas.height = H*DPR;
    canvas.style.width = W+"px"; canvas.style.height = H+"px";
    ctx.setTransform(DPR,0,0,DPR,0,0);
    const count = Math.max(70, Math.min(190, Math.floor((W*H)/8000)));
    nodes = Array.from({length:count}, ()=>({
      x: Math.random()*W,
      y: Math.random()*H,
      vx: (Math.random()-0.5)*0.3,
      vy: (Math.random()-0.5)*0.3,
      r: Math.random()*2.1+1.1,
      pulse: Math.random()*Math.PI*2
    }));
  }

  function step(){
    ctx.clearRect(0,0,W,H);
    const linkDist = 165;
    const mouseDist = 210;

    for(let i=0;i<nodes.length;i++){
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if(n.x < 0 || n.x > W) n.vx *= -1;
      if(n.y < 0 || n.y > H) n.vy *= -1;

      if(mouse.active){
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d = Math.hypot(dx,dy);
        if(d < mouseDist){
          const f = (1 - d/mouseDist) * 0.02;
          n.vx += (dx/d) * f;
          n.vy += (dy/d) * f;
        }
      }
      const speed = Math.hypot(n.vx,n.vy);
      if(speed > 0.6){ n.vx *= 0.6/speed; n.vy *= 0.6/speed; }
    }

    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x-b.x, a.y-b.y);
        if(d < linkDist){
          const op = (1 - d/linkDist) * 0.5;
          ctx.strokeStyle = `rgba(34,230,255,${op})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
      if(mouse.active){
        const d = Math.hypot(nodes[i].x-mouse.x, nodes[i].y-mouse.y);
        if(d < mouseDist){
          const op = (1 - d/mouseDist) * 0.75;
          ctx.strokeStyle = `rgba(168,85,247,${op})`;
          ctx.lineWidth = 1.1;
          ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(mouse.x,mouse.y); ctx.stroke();
        }
      }
    }

    for(const n of nodes){
      n.pulse += 0.02;
      const glow = 0.75 + Math.sin(n.pulse) * 0.25;
      ctx.beginPath();
      ctx.arc(n.x, n.y + scrollParallax, n.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(210,238,255,${glow})`;
      ctx.shadowColor = "rgba(34,230,255,0.9)";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if(mouse.active){
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI*2);
      ctx.fillStyle = "rgba(168,85,247,0.95)";
      ctx.shadowColor = "rgba(168,85,247,0.95)";
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if(!reduceMotion) requestAnimationFrame(step);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e)=>{ mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; });
  window.addEventListener("mouseleave", ()=>{ mouse.active = false; });
  window.addEventListener("scroll", ()=>{ scrollParallax = Math.min(30, window.scrollY * 0.01); }, { passive:true });

  resize();
  step();
})();