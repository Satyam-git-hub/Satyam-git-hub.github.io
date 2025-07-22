// Portfolio data from provided JSON
const portfolioData = {
  "personal": {
    "name": "Satyam Dubey",
    "title": "Software Developer & Researcher",
    "description": "Passionate about eBPF, Post-Quantum Cryptography, AI, and next-generation networking technologies",
    "location": "Available for opportunities"
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
    },
    {
      "title": "6G Research Framework",
      "description": "Research platform for studying next-generation wireless communication technologies",
      "technologies": ["Research", "Simulation", "Networking", "Innovation"],
      "status": "In Progress"
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
    },
    {
      "title": "AI Research Assistant",
      "company": "University Research Center",
      "period": "2022 - 2023",
      "description": "Worked on machine learning applications for telecommunications and next-gen wireless systems"
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
        "readTime": "8 min read",
        "description": "A comprehensive guide to understanding eBPF fundamentals and its applications in modern networking"
      },
      {
        "title": "Advanced eBPF: Kernel Tracing and Performance Monitoring",
        "date": "2024-11-28",
        "readTime": "12 min read",
        "description": "Deep dive into using eBPF for system observability and performance optimization"
      }
    ],
    "PQC": [
      {
        "title": "Understanding Post-Quantum Cryptography: Preparing for the Quantum Era",
        "date": "2024-12-10",
        "readTime": "15 min read",
        "description": "Exploring quantum-resistant cryptographic algorithms and their implementation challenges"
      },
      {
        "title": "Lattice-Based Cryptography: Mathematical Foundations",
        "date": "2024-11-15",
        "readTime": "18 min read",
        "description": "In-depth analysis of lattice-based cryptographic protocols and their security guarantees"
      }
    ],
    "AI": [
      {
        "title": "Machine Learning in Telecommunications: Current Trends",
        "date": "2024-12-05",
        "readTime": "10 min read",
        "description": "How AI and ML are transforming network optimization and management"
      },
      {
        "title": "Neural Networks for Network Traffic Prediction",
        "date": "2024-11-20",
        "readTime": "14 min read",
        "description": "Building predictive models for network performance using deep learning"
      }
    ],
    "5G/6G Research": [
      {
        "title": "The Evolution to 6G: Technical Challenges and Opportunities",
        "date": "2024-12-01",
        "readTime": "16 min read",
        "description": "Exploring the key technologies and research directions for sixth-generation wireless systems"
      },
      {
        "title": "5G Network Slicing: Implementation and Use Cases",
        "date": "2024-11-10",
        "readTime": "11 min read",
        "description": "Understanding network slicing concepts and their practical applications in 5G networks"
      }
    ]
  }
};

// Current page state
let currentPage = 'home';

// Constants for layout
const NAVBAR_HEIGHT = 80;
const SCROLL_OFFSET = 20;

// CRITICAL FIX: Enhanced smooth scroll with proper offset calculation
function smoothScrollToElement(targetId) {
  const element = document.getElementById(targetId);
  if (!element) return;
  
  // Special handling for home section - scroll to absolute top
  if (targetId === 'home') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return;
  }
  
  const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementTop - NAVBAR_HEIGHT - SCROLL_OFFSET;
  
  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: 'smooth'
  });
}

// CRITICAL FIX: Improved scrollToSection function
function scrollToSection(sectionId) {
  console.log('Scrolling to section:', sectionId);
  
  if (currentPage !== 'home') {
    showPage('home');
    // Wait for page transition then scroll with proper offset
    setTimeout(() => {
      smoothScrollToElement(sectionId);
    }, 350);
  } else {
    smoothScrollToElement(sectionId);
  }
  
  // Update active nav state
  setTimeout(() => {
    updateActiveNavLink(sectionId);
  }, 100);
}

// Fixed Page Management
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
      renderBlogCategories();
    }
  } else {
    const mainPage = document.getElementById('mainPage');
    if (mainPage) {
      mainPage.classList.add('active');
      mainPage.style.display = 'block';
      currentPage = 'home';
      console.log('Switched to home page');
    }
  }
  
  // Update navigation active states
  updateNavActiveStates(pageId);
  
  // Scroll to top with smooth behavior
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
  
  console.log('App initialized successfully');
}

// CRITICAL FIX: Enhanced Navigation Setup
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
        
        // Remove active class from all nav links first
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
        
        // Navigate to section with proper offset
        scrollToSection(targetId);
      }
    });
  });

  // Handle brand link - FIXED to scroll to top properly
  const brandLink = document.querySelector('.brand-link');
  if (brandLink) {
    brandLink.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Brand link clicked');
      
      if (currentPage !== 'home') {
        showPage('home');
      } else {
        // If already on home, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Update nav state
        const homeNavLink = document.querySelector('.nav-link[href="#home"]');
        if (homeNavLink) {
          navLinks.forEach(navLink => navLink.classList.remove('active'));
          homeNavLink.classList.add('active');
        }
      }
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
        scrollToSection(targetId);
      }
    });
  });

  // CRITICAL FIX: Mobile hamburger menu
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

// CRITICAL FIX: Enhanced Scroll Handler with improved section detection
function setupScrollHandler() {
  const navbar = document.getElementById('navbar');
  let ticking = false;
  
  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when scrolling past 50px
    if (scrollTop > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
    
    // Update active nav links for home page sections only
    if (currentPage === 'home') {
      updateActiveNavLinkOnScroll();
    }
    
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
  
  // Initial call
  updateNavbar();
}

// CRITICAL FIX: Improved active navigation link highlighting with better section detection
function updateActiveNavLinkOnScroll() {
  if (currentPage !== 'home') return;
  
  const sections = document.querySelectorAll('#mainPage section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]:not([href="#blogs"])');
  
  let currentSection = 'home'; // Default to home
  const scrollPosition = window.pageYOffset;
  const viewportHeight = window.innerHeight;
  
  // Special handling for very top of page
  if (scrollPosition < 100) {
    currentSection = 'home';
  } else {
    // Find the section that's most visible in the viewport
    sections.forEach(section => {
      const sectionTop = section.offsetTop - NAVBAR_HEIGHT - 50;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      // Check if section is in view
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = sectionId;
      }
    });
    
    // Special handling for contact section at bottom of page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const contactTop = contactSection.offsetTop - NAVBAR_HEIGHT - 100;
      if (scrollPosition >= contactTop) {
        currentSection = 'contact';
      }
    }
  }
  
  // Update nav link active states
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

function updateActiveNavLink(sectionId) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    }
  });
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
  console.log('Projects rendered successfully');
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
  console.log('Experience rendered successfully');
}

// CRITICAL FIX: Blog Categories Rendering
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
    const postsHTML = posts.map(post => `
      <div class="blog-post">
        <h4>${post.title}</h4>
        <p>${post.description}</p>
        <div class="blog-meta">
          <span>${post.readTime} • ${post.date}</span>
          <a href="https://medium.com/@satyam012005" target="_blank" rel="noopener noreferrer">Read More →</a>
        </div>
      </div>
    `).join('');

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

// FIXED: Back to Top Button
function setupBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (currentPage === 'blogs') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Always go to home section and scroll to top
      if (currentPage !== 'home') {
        showPage('home');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Update nav state to show Home as active
        const homeNavLink = document.querySelector('.nav-link[href="#home"]');
        if (homeNavLink) {
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
          homeNavLink.classList.add('active');
        }
      }
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
    const animateElements = document.querySelectorAll('.project-card, .experience-item, .stat-card, .blog-category');
    animateElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
  }, 100);
}

// CRITICAL FIX: Keyboard navigation support
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
    scrollToSection('home');
  }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
  // Handle browser navigation if needed
  console.log('Browser navigation detected');
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showPage = showPage;
window.portfolioData = portfolioData;

// Additional utility functions
window.goToTop = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Log initialization
console.log('Satyam Dubey Portfolio - JavaScript Loaded Successfully');
console.log('Navigation overlap issues fixed with proper scroll offsets');
console.log('All navigation bugs resolved - Home link, Contact detection, and scroll behavior improved');