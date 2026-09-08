const root=document.documentElement;
const themeToggle=document.getElementById("themeToggle");
function getTheme(){try{const t=localStorage.getItem("theme");if(t==="light"||t==="dark")return t}catch(e){}return matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}
function setTheme(t){root.dataset.theme=t;try{localStorage.setItem("theme",t)}catch(e){}themeToggle.innerHTML=t==="dark"?"☀ Light":"☾ Dark";themeToggle.setAttribute("aria-label",`Switch to ${t==="dark"?"light":"dark"} mode`)}
setTheme(getTheme());themeToggle.addEventListener("click",()=>setTheme(root.dataset.theme==="dark"?"light":"dark"));

const nav=document.getElementById("navbar");window.addEventListener("scroll",()=>{const s=scrollY>24;nav.style.background=s?"color-mix(in srgb, var(--bg) 88%, transparent)":"transparent";nav.style.backdropFilter=s?"blur(16px)":"none";nav.style.borderBottom=s?"1px solid var(--border)":"1px solid transparent"});

const reveals=document.querySelectorAll(".reveal");const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}}),{threshold:.12});reveals.forEach(e=>obs.observe(e));
document.getElementById("year").textContent=new Date().getFullYear();

const modal=document.getElementById("mediaModal"), modalImage=document.getElementById("modalImage"), modalTitle=document.getElementById("modalTitle"), modalLabel=document.getElementById("modalLabel"), modalDescription=document.getElementById("modalDescription"), modalNote=document.getElementById("modalNote");
const content={
 books:{label:"02 / Interests / Reading",title:"My Reading Goal",description:"A little visual corner for the books I want to read next. Replace the placeholder image with your own reading-goal / TBR image.",image:"assets/reading-goal.jpg",note:"Add your image as assets/reading-goal.jpg"},
 photography:{label:"02 / Interests / Photography",title:"My Photography",description:"A small gallery entry for photographs you've taken. Replace the placeholder with one of your own photos or a collage.",image:"assets/photography.jpg",note:"Add your image as assets/photography.jpg"}
};
document.querySelectorAll("[data-modal]").forEach(card=>card.addEventListener("click",()=>{const d=content[card.dataset.modal];modalLabel.textContent=d.label;modalTitle.textContent=d.title;modalDescription.textContent=d.description;modalNote.textContent=d.note;modalImage.src=d.image;modalImage.alt=d.title;modalImage.onerror=()=>{modalImage.removeAttribute("src");modalNote.textContent="Image file not added yet — place the file at "+d.image}}));
document.querySelectorAll("[data-modal]").forEach(card=>card.addEventListener("click",()=>{modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}));
document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
