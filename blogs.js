/* =========  BLOG “DATABASE”  =========
   Add new entries here and drop matching .md
   files in /blogs/
*/
const BLOGS = [
  {
    slug: "understanding-post-quantum-cryptography",
    title: "Understanding Post-Quantum Cryptography",
    date: "2025-07-23",
    tags: ["PQC", "Cryptography"],
  },
];

/* =========  ELEMENT HOOKS  ========= */
const blogListEl = document.getElementById("blogList");
const mainPage = document.getElementById("mainPage");
const blogReader = document.getElementById("blogReader");
const postTitleEl = document.getElementById("postTitle");
const postMetaEl = document.getElementById("postMeta");
const postContentEl = document.getElementById("postContent");
const backToBlogs = document.getElementById("backToBlogs");

/* =========  LIST RENDER  ========= */
function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function renderBlogList() {
  blogListEl.innerHTML = "";
  BLOGS.forEach((b) => {
    const li = document.createElement("li");
    li.className = "blog-card";
    li.innerHTML = `
      <h3>${b.title}</h3>
      <span class="blog-date">${formatDate(b.date)}</span>
      <span class="blog-tags">${b.tags.join(", ")}</span>`;
    li.onclick = () => openPost(b);
    blogListEl.appendChild(li);
  });
}
/* =========  OPEN POST  ========= */
async function openPost(b) {
  mainPage.classList.remove("active");
  blogReader.classList.add("active");
  postTitleEl.textContent = b.title;
  postMetaEl.textContent = `${formatDate(b.date)} • ${b.tags.join(" / ")}`;

  const rawURL = `https://raw.githubusercontent.com/Satyam-git-hub/Satyam-git-hub.github.io/main/blogs/${b.slug}.md`;
  const md = await fetch(rawURL).then((r) => r.text());
  postContentEl.innerHTML = marked.parse(md, {
    mangle: false,
    headerIds: false,
  });
  window.scrollTo(0, 0);
}
/* =========  BACK  ========= */
backToBlogs.onclick = () => {
  blogReader.classList.remove("active");
  mainPage.classList.add("active");
  window.location.hash = "#blogs";
};
/* =========  INIT  ========= */
renderBlogList();
