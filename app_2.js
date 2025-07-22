// Portfolio data from provided JSON
const portfolioData = {
  "personal": {
    "name": "Satyam Dubey",
    "title": "Software Developer & Researcher",
    "description": "Passionate about eBPF, Post-Quantum Cryptography, AI, and next-generation networking technologies",
    "status": "Available for opportunities"
  },
  "skills": [
    "Extended Berkeley Packet Filter (eBPF)",
    "Post-Quantum Cryptography", 
    "Artificial Intelligence",
    "5G/6G Research",
    "Systems Programming",
    "Network Security",
    "Linux Kernel Development"
  ],
  "projects": [
    {
      "title": "eBPF Network Monitor",
      "description": "High-performance network monitoring tool using eBPF for real-time packet analysis",
      "technologies": ["eBPF", "C", "Python", "Linux Kernel"],
      "status": "In Progress"
    },
    {
      "title": "Post-Quantum Key Exchange", 
      "description": "Implementation of lattice-based cryptographic protocols for quantum-resistant communication",
      "technologies": ["Cryptography", "C++", "Mathematical Algorithms"],
      "status": "Research Phase"
    },
    {
      "title": "AI-Powered Network Optimization",
      "description": "Machine learning system for optimizing 5G network performance and resource allocation", 
      "technologies": ["Python", "TensorFlow", "Network Protocols", "AI/ML"],
      "status": "Completed"
    }
  ],
  "experience": [
    {
      "title": "Research Intern",
      "company": "Advanced Networking Lab", 
      "period": "2024 - Present",
      "description": "Conducting research on eBPF applications in high-speed networking and developing quantum-resistant protocols"
    },
    {
      "title": "Software Developer",
      "company": "Tech Innovation Hub",
      "period": "2023 - 2024", 
      "description": "Developed system-level applications focusing on network security and performance optimization"
    }
  ],
  "social_links": {
    "github": "https://github.com/Satyam-git-hub",
    "linkedin": "https://www.linkedin.com/in/satyam-dubey-142598258/",
    "medium": "https://medium.com/@satyam012005"
  },
  "blogs": {
    "eBPF": [
      {
        "title": "Getting Started with eBPF for Network Programming",
        "date": "2024-12-15",
        "readTime": "8 min read"
      }
    ],
    "PQC": [
      {
        "title": "Understanding Post-Quantum Cryptography",
        "date": "2024-12-10", 
        "readTime": "15 min read"
      }
    ],
    "AI": [
      {
        "title": "Machine Learning in Telecommunications",
        "date": "2024-12-05",
        "readTime": "10 min read"
      }
    ],
    "5G/6G Research": [
      {
        "title": "The Evolution to 6G: Technical Challenges",
        "date": "2024-12-01",
        "readTime": "16 min read"
      }
    ]
  }
};

// Current page state
let currentPage = 'home';

// Utility Functions
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function scrollToSection(sectionId) {
  if (currentPage !== 'home') {
    showPage('home');
    // Wait for page transition then scroll
    setTimeout(() => {
      smoothScroll(`#${sectionId}`);
    }, 300);
  } else {
    smoothScroll(`#${sectionId}`);
  }
}

// Page Management
function showPage(pageId) {
  console.log('showPage called with:', pageId);
  
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
    page.style.display = 'none';
  });
  
  // Show target page
  if (pageId === 'blogs') {
    const blogsPage = document.getElementById('blogsPage');
    if (blogsPage) {
      blogsPage.classList.add('active');
      blogsPage.style.display = 'block';
      currentPage = 'blogs';
      console.log('Switched to blogs page');
      // Render blogs content
      renderBlogCategories();
    } else {
      console.error('Blogs page element not found');
    }
  } else {
    const mainPage = document.getElementById('mainPage');
    if (mainPage) {
      mainPage.classList.add('active');
      mainPage.style.display = 'block';
      currentPage = 'home';
      console.log('Switched to home page');
    } else {
      console.error('Main page element not found');
    }
  }
  
  // Update navigation active states
  updateNavActiveStates(pageId);
  
  // Close mobile menu if open
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  if (navMenu && hamburger) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavActiveStates(activePageId) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if (activePageId === 'blogs' && href === '#blogs') {
      link.classList.add('active');
    } else if (activePageId === 'home' && href === '#home') {
      link.classList.add('active');
    }
  });
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupNavigation();
  renderProjects();
  renderExperience();
  setupBackToTop();
  setupIntersectionObserver();
  setupScrollHandler();
  
  // Show home page by default
  showPage('home');
}

// Enhanced Navigation Setup with Fixed Links
function setupNavigation() {
  // Handle navigation links with proper event handling
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const href = this.getAttribute('href');
      console.log('Nav link clicked:', href);
      
      // Handle blogs link
      if (href === '#blogs') {
        console.log('Blogs link clicked, showing blogs page');
        showPage('blogs');
        return;
      }
      
      // Handle home page sections
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        console.log('Section link clicked:', targetId);
        
        // If we're not on home page, go to home first
        if (currentPage !== 'home') {
          showPage('home');
          setTimeout(() => {
            scrollToSection(targetId);
          }, 300);
        } else {
          scrollToSection(targetId);
        }
      }
    });
  });

  // Handle brand link
  const brandLink = document.querySelector('.brand-link');
  if (brandLink) {
    brandLink.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Brand link clicked');
      showPage('home');
    });
  }

  // Handle footer navigation links
  const footerLinks = document.querySelectorAll('.footer-section a[href^="#"]');
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      
      if (href === '#blogs') {
        showPage('blogs');
      } else if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        if (currentPage !== 'home') {
          showPage('home');
          setTimeout(() => {
            scrollToSection(targetId);
          }, 300);
        } else {
          scrollToSection(targetId);
        }
      }
    });
  });

  // Mobile hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }
}

// Enhanced Scroll Handler for Transparent Navigation
function setupScrollHandler() {
  const navbar = document.getElementById('navbar');
  
  // Throttled scroll handler for performance
  let ticking = false;
  
  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when scrolling past 50px
    if (scrollTop > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
    
    // Update active nav links for home page sections
    updateActiveNavLink();
    
    // Update back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
  
  // Initial call to set correct state
  updateNavbar();
}

// Render Projects
function renderProjects() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;

  const projectsHTML = portfolioData.projects.map(project => {
    const statusClass = project.status === 'Completed' ? 'success' : 
                       project.status === 'In Progress' ? 'warning' : 'info';
    
    const techBadges = project.technologies.map(tech => 
      `<span class="tech-badge">${tech}</span>`
    ).join('');

    return `
      <div class="project-card">
        <div class="project-status">
          <span class="status status--${statusClass}">${project.status}</span>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${techBadges}
        </div>
      </div>
    `;
  }).join('');

  projectsGrid.innerHTML = projectsHTML;
}

// Render Experience
function renderExperience() {
  const experienceTimeline = document.getElementById('experienceTimeline');
  if (!experienceTimeline) return;

  const experienceHTML = portfolioData.experience.map(exp => `
    <div class="experience-item">
      <div class="experience-header">
        <div>
          <h3 class="experience-title">${exp.title}</h3>
          <div class="experience-org">${exp.company}</div>
        </div>
        <div class="experience-period">${exp.period}</div>
      </div>
      <p class="experience-description">${exp.description}</p>
    </div>
  `).join('');

  experienceTimeline.innerHTML = experienceHTML;
}

// Blog Categories Rendering
function renderBlogCategories() {
  const blogCategoriesContainer = document.getElementById('blogCategories');
  if (!blogCategoriesContainer) {
    console.error('Blog categories container not found');
    return;
  }
  
  console.log('Rendering blog categories');

  const categoryIcons = {
    'eBPF': 'eBPF',
    'PQC': 'PQC',  
    'AI': 'AI',
    '5G/6G Research': '5G'
  };

  const categoriesHTML = Object.entries(portfolioData.blogs).map(([category, posts]) => {
    const postsHTML = posts.map(post => {
      // Extract excerpt from title for demo purposes
      const excerpt = `Deep dive into ${category.toLowerCase()} technologies and their practical applications in modern software development.`;
      
      return `
        <div class="blog-post">
          <h4>${post.title}</h4>
          <p>${excerpt}</p>
          <div class="blog-meta">
            <span>${post.readTime} • ${post.date}</span>
            <a href="${portfolioData.social_links.medium}" target="_blank" rel="noopener noreferrer">Read More →</a>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="blog-category">
        <h3>
          <div class="category-icon">${categoryIcons[category] || category.charAt(0)}</div>
          ${category}
        </h3>
        <div class="blog-posts">
          ${postsHTML}
        </div>
      </div>
    `;
  }).join('');

  blogCategoriesContainer.innerHTML = categoriesHTML;
  console.log('Blog categories rendered successfully');
}

// Back to Top Button
function setupBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (currentPage === 'blogs') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToSection('home');
    }
  });
}

// Intersection Observer for animations
function setupIntersectionObserver() {
  const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Wait for content to be rendered before observing
  setTimeout(() => {
    const animateElements = document.querySelectorAll('.project-card, .experience-item, .stat-card');
    animateElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
  }, 100);
}

// Active navigation link highlighting for home page sections
function updateActiveNavLink() {
  if (currentPage !== 'home') return;
  
  const sections = document.querySelectorAll('#mainPage section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  // ESC key to close mobile menu
  if (e.key === 'Escape') {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  }
  
  // Home key to go to home
  if (e.key === 'Home' && e.ctrlKey) {
    e.preventDefault();
    showPage('home');
  }
});

// Handle window resize to close mobile menu
window.addEventListener('resize', function() {
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  
  if (window.innerWidth > 768) {
    if (navMenu && hamburger) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  }
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showPage = showPage;
window.portfolioData = portfolioData;