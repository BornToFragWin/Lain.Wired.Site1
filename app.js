const entries = [
  {id:"0001",title:"Lain Iwakura",subtitle:"岩倉 玲音",type:"character",status:"CONNECTED?",file:"lain.jpg",short:"The girl behind the screen",description:"Lain is a quiet schoolgirl whose life changes after she receives a strange email from a classmate. As she explores the Wired, the boundary between identity, memory and reality begins to blur. Add your own notes and episode references here."},
  {id:"0002",title:"Alice Mizuki",subtitle:"瑞城 ありす",type:"character",status:"ONLINE",file:"alice.jpg",short:"Lain's friend",description:"Alice is Lain's school friend and one of the links between ordinary everyday life and the increasingly unsettling world around Lain. Add character details, quotes you have permission to use, and your favourite scenes here."},
  {id:"0003",title:"The Wired",subtitle:"ワイアード",type:"scene",status:"NETWORK ACTIVE",file:"wired.jpg",short:"A network beyond the screen",description:"The Wired is a global communication network that becomes central to the story. The series asks how technology changes the way people understand presence, identity and truth."},
  {id:"0004",title:"Knights",subtitle:"KNIGHTS OF THE EASTERN CALCULUS",type:"scene",status:"ENCRYPTED",file:"knights.jpg",short:"Unknown users / hidden layers",description:"The Knights are a secretive group associated with the Wired. This entry is a starting point for your own spoiler-marked notes about their role in the story."},
  {id:"0005",title:"Lain // Protocol",subtitle:"PROTOCOL 7",type:"scene",status:"SIGNAL LOST",file:"protocol.jpg",short:"Fragments of the network",description:"A visual archive entry for the series' computer interfaces, cables, city power lines and disorienting soundscape. Replace this text with your own scene notes."},
  {id:"0006",title:"Present Day",subtitle:"PRESENT TIME",type:"scene",status:"RECORDING",file:"present-day.jpg",short:"Reality is not always reliable",description:"The series uses repetition, silence and strange transitions to create an uneasy atmosphere. Use this entry to record an episode, timestamp and what you noticed in the scene."}
];
const gallery = document.querySelector("#gallery");
const search = document.querySelector("#search");
const empty = document.querySelector("#empty");
const modal = document.querySelector("#modal");
let activeFilter = "all";

function tile(entry) {
  const button = document.createElement("button");
  button.className = "tile";
  button.type = "button";
  button.innerHTML = `
    <div class="tile-image">
      <img src="images/${entry.file}" alt="${entry.title}" loading="lazy">
      <div class="image-fallback"><b>${entry.title.split(" ")[0]}</b><span>IMAGE / ${entry.id}</span><span>ADD YOUR ARTWORK</span></div>
    </div>
    <div class="tile-meta"><span class="tile-title">${entry.title}</span><span class="tile-code">[${entry.id}]</span></div>
    <div class="tile-desc">${entry.short}</div>`;
  const img = button.querySelector("img");
  const fallback = button.querySelector(".image-fallback");
  img.addEventListener("load", () => { fallback.style.display = "none"; });
  img.addEventListener("error", () => { img.style.display = "none"; fallback.style.display = "flex"; });
  button.addEventListener("click", () => openEntry(entry));
  return button;
}
function render() {
  const term = search.value.trim().toLowerCase();
  const filtered = entries.filter(e => (activeFilter === "all" || e.type === activeFilter) &&
    [e.title,e.subtitle,e.short,e.description,e.status].join(" ").toLowerCase().includes(term));
  gallery.replaceChildren(...filtered.map(tile));
  empty.hidden = filtered.length > 0;
}
function openEntry(entry) {
  document.querySelector("#modal-code").textContent = `FILE // ${entry.id}`;
  document.querySelector("#modal-title").textContent = entry.title;
  document.querySelector("#modal-subtitle").textContent = entry.subtitle;
  document.querySelector("#modal-type").textContent = entry.type.toUpperCase();
  document.querySelector("#modal-status").textContent = entry.status;
  document.querySelector("#modal-description").textContent = entry.description;
  const img = document.querySelector("#modal-image");
  const fallback = document.querySelector("#modal-image-fallback");
  img.style.display = "none";
  fallback.style.display = "flex";
  img.src = `images/${entry.file}`;
  img.alt = entry.title;
  img.onload = () => { img.style.display = "block"; fallback.style.display = "none"; };
  img.onerror = () => { img.style.display = "none"; fallback.style.display = "flex"; };
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
  document.querySelector(".modal-close").focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });
search.addEventListener("input", render);
document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => {
  activeFilter = btn.dataset.filter;
  document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === btn));
  render();
}));
render();
