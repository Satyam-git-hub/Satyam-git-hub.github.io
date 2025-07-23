// Portfolio App JavaScript - Core website functionality
(function () {
  "use strict";

  // Site data for projects and experience
  const SITE_DATA = {
    projects: [
      {
        title: "eBPF Packet Monitor",
        description:
          "Real-time network analyzer using eBPF maps for high-performance packet inspection and monitoring.",
        tech: ["eBPF", "C", "Linux Kernel"],
        link: "https://github.com/Satyam-git-hub/ebpf-monitor",
      },
      {
        title: "PQ-TLS Demo",
        description:
          "TLS 1.3 implementation with Kyber + Dilithium hybrid post-quantum cryptographic suites.",
        tech: ["Post-Quantum Crypto", "TLS", "C++"],
        link: "https://github.com/Satyam-git-hub/pq-tls",
      },
      {
        title: "AI-Powered 6G Scheduler",
        description:
          "Reinforcement learning algorithm for optimized 6G network resource allocation and scheduling.",
        tech: ["AI", "6G", "Python", "RL"],
        link: "https://github.com/Satyam-git-hub/6g-scheduler",
      },
    ],
    experience: [
      {
        role: "Security Research Intern",
        company: "QuantumSafe Labs",
        period: "May 2024 – Aug 2024",
        description:
          "Implemented lattice-based key exchange protocols in embedded firmware. Researched post-quantum cryptographic algorithms for IoT devices.",
      },
      {
        role: "Teaching Assistant",
        company: "IIIT-Delhi",
        period: "Jan 2024 – Apr 2024",
        description:
          "Assisted in Networks & Systems course. Designed and implemented eBPF laboratory exercises for advanced networking concepts.",
      },
    ],
  };

  class PortfolioApp {
    constructor() {
      this.init();
    }

    init() {
      this.setupNavigation();
      this.renderProjects();
      this.renderExperience();
      this.setupScrollEffects();
    }

    setupNavigation() {
      // Smooth scrolling for navigation links
      document
        .querySelectorAll(".nav-link, .btn-primary, .btn-outline")
        .forEach((link) => {
          link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
              e.preventDefault();
              const target = document.querySelector(href);
              if (target) {
                const navbarHeight =
                  document.getElementById("navbar").offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth",
                });
              }
            }
          });
        });

      // Update active navigation link based on scroll position
      window.addEventListener("scroll", () => {
        this.updateActiveNavLink();
      });
    }

    updateActiveNavLink() {
      const sections = document.querySelectorAll("section[id]");
      const navLinks = document.querySelectorAll(".nav-link");
      const navbarHeight = document.getElementById("navbar").offsetHeight;

      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    }

    renderProjects() {
      const projectsGrid = document.getElementById("projectsGrid");
      if (!projectsGrid) return;

      projectsGrid.innerHTML = "";

      SITE_DATA.projects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.className = "project-card";

        const techTags = project.tech
          .map((tech) => `<span class="tech-tag">${tech}</span>`)
          .join("");

        projectCard.innerHTML = `
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">${techTags}</div>
                    <a href="${project.link}" target="_blank" class="project-link">View on GitHub →</a>
                `;

        projectsGrid.appendChild(projectCard);
      });
    }

    renderExperience() {
      const experienceTimeline = document.getElementById("experienceTimeline");
      if (!experienceTimeline) return;

      experienceTimeline.innerHTML = "";

      SITE_DATA.experience.forEach((exp) => {
        const timelineItem = document.createElement("div");
        timelineItem.className = "timeline-item";

        timelineItem.innerHTML = `
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">${exp.role}</h3>
                        <div class="timeline-company">${exp.company}</div>
                        <div class="timeline-period">${exp.period}</div>
                        <p class="timeline-description">${exp.description}</p>
                    </div>
                `;

        experienceTimeline.appendChild(timelineItem);
      });
    }

    setupScrollEffects() {
      // Intersection Observer for fade-in animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      }, observerOptions);

      // Observe sections for scroll animations
      document.querySelectorAll("section").forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        observer.observe(section);
      });

      // Observe project and timeline items
      document
        .querySelectorAll(".project-card, .timeline-item")
        .forEach((item) => {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          observer.observe(item);
        });
    }
  }

  // Initialize the app when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    new PortfolioApp();
  });
})();
