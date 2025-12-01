// ======================
// Project data
// ======================
const projects = [
  {
    id: "virtual-home-builder",
    title: "Virtual 3D Home Builder",
    shortDescription: "3D visualization tool for home design",
    description:
      "A software tool that helps users design and view home layouts in 3D. It lets users upload blueprints to create 3D models, customize rooms, furniture, colors, and materials, and take virtual walkthroughs. The project uses 3D modeling and machine learning to make home planning easy, accurate, and interactive.",
    techStack: ["Python", "Django", "3D Modeling", "Machine Learning"],
    image:
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=800&h=450",
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: "parking-system",
    title: "Online Car Parking Reservation System",
    shortDescription: "Web-based parking management system",
    description:
      "A web-based system that helps users find, book, and pay for parking spots in advance at malls and commercial areas. It shows real-time space availability and sends alerts to reduce time spent searching for parking. For mall operators, it helps manage parking better and track usage. The system improves customer experience and reduces traffic congestion.",
    techStack: ["Python", "Django", "JavaScript", "MySQL"],
    image:
      "https://i.pinimg.com/736x/3b/72/cd/3b72cdd2e3b2d7f21aa5dec606b8af88.jpg",
    demoLink: "#",
    githubLink: "#",
  },
];

// ======================
// Run after DOM is ready
// ======================
document.addEventListener("DOMContentLoaded", () => {
  const projectsGrid = document.querySelector(".projects-grid");
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content-container");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const currentYearSpan = document.getElementById("current-year");

  // Footer year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ======================
  // Load Projects
  // ======================
  function createProjectCard(project) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.setAttribute("data-id", project.id);

    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}">
        <div class="project-overlay">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.shortDescription}</p>
          <span class="project-tag">${project.techStack[0]}</span>
        </div>
      </div>
      <div class="project-info">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.shortDescription}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      openProjectModal(project);
    });

    return card;
  }

  function loadProjects() {
    if (!projectsGrid) return;
    projects.forEach((project) => {
      const projectCard = createProjectCard(project);
      projectsGrid.appendChild(projectCard);
    });
  }

  // ======================
  // Modal logic
  // ======================
  function openProjectModal(project) {
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-header">
        <h2 class="modal-title">${project.title}</h2>
      </div>
      <div class="modal-body">
        <img src="${project.image}" alt="${project.title}">
        <p class="modal-description">${project.description}</p>

        <div class="tech-stack">
          <h4>Technologies Used:</h4>
          <div class="tech-tags">
            ${project.techStack
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
          </div>
        </div>

        <div class="modal-actions">
          <a href="${project.demoLink}" target="_blank" rel="noreferrer" class="btn btn-secondary modal-btn">
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>
          <a href="${project.githubLink}" target="_blank" rel="noreferrer" class="btn btn-primary modal-btn">
            <i class="fab fa-github"></i> GitHub
          </a>
        </div>
      </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  // Close modal by clicking overlay or X
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeProjectModal();
        return;
      }

      if (
        e.target.classList.contains("close-modal") ||
        e.target.closest(".close-modal")
      ) {
        e.stopPropagation();
        closeProjectModal();
      }
    });
  }

  // ======================
  // Theme Toggle
  // ======================
  const body = document.body;

  function setInitialTheme() {
    if (!themeToggleBtn) return;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      body.classList.add("light");
      themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      body.classList.remove("light");
      themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }

  setInitialTheme();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("light");
      const isLight = body.classList.contains("light");
      themeToggleBtn.innerHTML = isLight
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }

  // ======================
  // Mobile Menu
  // ======================
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // ======================
  // Smooth Scroll
  // ======================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetSelector = this.getAttribute("href");
      if (!targetSelector || targetSelector === "#") return;

      const target = document.querySelector(targetSelector);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      if (navMenu) navMenu.classList.remove("active");
    });
  });

  // ======================
  // Load Projects
  // ======================
  loadProjects();

  // ======================
  // Scroll Reveal
  // ======================
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }
});
