/* ----------  BLOG DATABASE  ----------
   Add one object per .md file you drop in /blogs/
*/
const BLOGS = [
  {
    slug: "understanding-post-quantum-cryptography",
    title: "Understanding Post-Quantum Cryptography",
    date: "2025-07-23",
    tags: ["PQC", "Cryptography"],
  },
];

/* ----------  ELEMENT HOOKS  ---------- */
const listEl = document.getElementById("blogList");
const readerPg = document.getElementById("blogReader");
const mainPg = document.getElementById("mainPage");
const titleEl = document.getElementById("postTitle");
const metaEl = document.getElementById("postMeta");
const bodyEl = document.getElementById("postContent");
const backBtn = document.getElementById("backToBlogs");

/* ----------  RENDER LIST  ---------- */
function fmt(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function renderList() {
  listEl.innerHTML = "";
  BLOGS.forEach((p) => {
    const li = document.createElement("li");
    li.className = "blog-card";
    li.innerHTML = `<h3 class="blog-title">${p.title}</h3>
                  <div class="blog-meta"><span class="blog-date">${fmt(
                    p.date
                  )}</span>
                  <span class="blog-tags">${p.tags.join(", ")}</span></div>`;
    li.onclick = () => openPost(p);
    listEl.appendChild(li);
  });
}

/* ----------  OPEN POST  ---------- */
async function openPost(p) {
  // page swap
  mainPg.classList.remove("active");
  readerPg.classList.add("active");

  // header
  titleEl.textContent = p.title;
  metaEl.textContent = `${fmt(p.date)} • ${p.tags.join(" / ")}`;

  // fetch markdown raw from GitHub
  const rawURL = `https://raw.githubusercontent.com/Satyam-git-hub/Satyam-git-hub.github.io/main/blogs/${p.slug}.md`;
  const md = await fetch(rawURL).then((r) => r.text());

  // convert → HTML with marked.js
  bodyEl.innerHTML = marked.parse(md, { mangle: false, headerIds: false });
  window.scrollTo(0, 0);
}

/* ----------  CLOSE ---------- */
backBtn.onclick = () => {
  readerPg.classList.remove("active");
  mainPg.classList.add("active");
  window.location.hash = "#blogs";
};

/* ----------  INIT ---------- */
renderList();
