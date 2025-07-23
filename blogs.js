/* =========  BLOG DATA  =========
 * Each blog object:
 *   slug:  filename (without .md) stored in /blogs/
 *   title: display name
 *   date : ISO string or "Month YYYY"
 *   tags : array of topics (for future filters)
 */
const BLOGS = [
  {
    slug: "understanding-post-quantum-cryptography",
    title: "Understanding Post-Quantum Cryptography",
    date: "2025-07-23",
    tags: ["PQC", "Cryptography"],
  },
];

/* =========  ELEMENTS  ========= */
const blogListEl = document.getElementById("blogList");
const blogReader = document.getElementById("blogReader");
const mainPage = document.getElementById("mainPage");
const postTitleEl = document.getElementById("postTitle");
const postMetaEl = document.getElementById("postMeta");
const postContentEl = document.getElementById("postContent");
const backToBlogs = document.getElementById("backToBlogs");

/* =========  RENDER BLOG LIST  ========= */
function renderBlogList() {
  blogListEl.innerHTML = "";
  BLOGS.forEach((post) => {
    const li = document.createElement("li");
    li.className = "blog-card";
    li.innerHTML = `
      <h3>${post.title}</h3>
      <span class="blog-date">${formatDate(post.date)}</span>
      <span class="blog-tags">${post.tags.join(", ")}</span>
    `;
    li.onclick = () => openPost(post);
    blogListEl.appendChild(li);
  });
}
function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* =========  OPEN BLOG POST  ========= */
async function openPost(post) {
  // swap pages
  mainPage.classList.remove("active");
  blogReader.classList.add("active");

  // set title and meta
  postTitleEl.textContent = post.title;
  postMetaEl.textContent = `${formatDate(post.date)} • ${post.tags.join(
    " / "
  )}`;

  // fetch raw Markdown from GitHub
  const url = `https://raw.githubusercontent.com/Satyam-git-hub/Satyam-git-hub.github.io/main/blogs/${post.slug}.md`;
  const md = await fetch(url).then((r) => r.text());

  // convert to HTML via Marked.js
  postContentEl.innerHTML = marked.parse(md, {
    mangle: false,
    headerIds: false,
  });
  window.scrollTo(0, 0);
}

/* =========  BACK TO LIST  ========= */
backToBlogs.onclick = () => {
  blogReader.classList.remove("active");
  mainPage.classList.add("active");
  window.location.hash = "#blogs";
};

/* =========  INIT  ========= */
renderBlogList();
