/* =========  SAMPLE DATA  (edit freely)  ========= */
const SITE_DATA = {
  projects: [
    {
      title: "eBPF Packet Monitor",
      description: "Real-time network analyzer using eBPF maps.",
      link: "https://github.com/Satyam-git-hub/ebpf-monitor",
    },
    {
      title: "PQ-TLS Demo",
      description: "TLS 1.3 with Kyber + Dilithium hybrid suites.",
      link: "https://github.com/Satyam-git-hub/pq-tls",
    },
    {
      title: "AI-Powered 6G Scheduler",
      description: "Reinforcement learning for 6G resource allocation.",
      link: "https://github.com/Satyam-git-hub/6g-scheduler",
    },
  ],
  experience: [
    {
      role: "Security Research Intern",
      org: "QuantumSafe Labs",
      period: "May 2024 – Aug 2024",
      desc: "Implemented lattice-based key exchange in embedded firmware.",
    },
    {
      role: "Teaching Assistant",
      org: "IIIT-Delhi",
      period: "Jan 2024 – Apr 2024",
      desc: "Assisted in the Networks & Systems course; designed eBPF labs.",
    },
  ],
};

/* =========  NAV & SECTION SCROLL  ========= */
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", (e) => {
    if (a.hash) {
      // smooth in-page scroll
      e.preventDefault();
      document.querySelector(a.hash).scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* =========  BACK TO TOP  ========= */
document.getElementById("backToTop").onclick = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

/* =========  RENDER PROJECTS  ========= */
(function renderProjects() {
  const wrap = document.getElementById("projectsWrap");
  SITE_DATA.projects.forEach((p) => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = p.link;
    card.target = "_blank";
    card.rel = "noopener";
    card.innerHTML = `<h3>${p.title}</h3><p>${p.description}</p>`;
    wrap.appendChild(card);
  });
})();

/* =========  RENDER EXPERIENCE  ========= */
(function renderExperience() {
  const list = document.getElementById("expTimeline");
  SITE_DATA.experience.forEach((exp) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${exp.role}</strong> @ ${exp.org} • <em>${exp.period}</em><br>${exp.desc}`;
    list.appendChild(li);
  });
})();
