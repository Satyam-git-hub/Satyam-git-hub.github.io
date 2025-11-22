/* ---------- BLOG CATALOG ---------- */
const BLOGS = [
  {
    slug: "understanding-post-quantum-cryptography",
    title: "Understanding Post-Quantum Cryptography",
    date: "2025-07-23",
    tags: ["PQC", "Cryptography"],
  },
  {
    slug: "Architecting-a-Comprehensive-eBPF-Powered-Cryptographic-Inventory",
    title: "Architecting a Comprehensive eBPF-Powered Cryptographic Inventory",
    date: "2025-07-24",
    tags: ["PQC", "CryptoInventory", "eBPF", "Observability"],
  },
];

/* ---------- DOM HOOKS ---------- */
const listEl = document.getElementById("blogList");
const readerPg = document.getElementById("blogReader");
const mainPg = document.getElementById("mainPage");
const titleEl = document.getElementById("postTitle");
const metaEl = document.getElementById("postMeta");
const bodyEl = document.getElementById("postContent");
const backBtn = document.getElementById("backToBlogs");

/* ---------- HELPERS ---------- */
const fmt = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/* ---------- LIST RENDER ---------- */
function renderList() {
  listEl.innerHTML = "";
  BLOGS.forEach((p) => {
    const li = document.createElement("li");
    li.className = "blog-card";
    li.innerHTML = `
      <div class="blog-content">
        <h3 class="blog-title">${p.title}</h3>
        <div class="blog-meta">
          <span class="blog-date">${fmt(p.date)}</span>
          <span class="blog-tags">${p.tags.join(", ")}</span>
        </div>
      </div>
      <i class="ri-arrow-right-line" style="display: none;"></i>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style="color: var(--text-secondary);">
        <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
      </svg>`;
    li.onclick = () => openPost(p);
    listEl.appendChild(li);
  });
}

/* ---------- OPEN POST ---------- */
async function openPost(p) {
  mainPg.classList.remove("active");
  readerPg.classList.add("active");

  titleEl.textContent = p.title;
  metaEl.textContent = `${fmt(p.date)} • ${p.tags.join(" / ")}`;

  const rawURL = `https://raw.githubusercontent.com/Satyam-git-hub/Satyam-git-hub.github.io/main/blogs/${p.slug}.md`;
  const md = await fetch(rawURL).then((r) => r.text());
  bodyEl.innerHTML = marked.parse(md, { mangle: false, headerIds: false });
  window.scrollTo(0, 0);
}

/* ---------- CLOSE ---------- */
backBtn.onclick = () => {
  readerPg.classList.remove("active");
  mainPg.classList.add("active");
  window.location.hash = "#blogs";
};

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", renderList);
