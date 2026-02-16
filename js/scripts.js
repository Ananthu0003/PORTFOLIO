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
    demoLink: "https://virtual-3d-home-builder-1.onrender.com",
    githubLink: "https://github.com/Ananthu0003/Virtual-3D-home-Builder.git",
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

  // ======================
  // Hero Canvas Animation
  // ======================
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    // Mouse interaction
    const mouse = {
      x: null,
      y: null,
      radius: (canvas.height / 80) * (canvas.width / 80)
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // Particle class
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      // Method to draw individual particle
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      // Method to check particle position, check mouse position, move the particle, draw the particle
      update() {
        // Check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // Draw particle
        this.draw();
      }
    }

    // Create particle array
    function init() {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;

      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#a78bfa'; // Primary color

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }

      connect();
    }

    // Check if particles are close enough to draw line between them
    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                         ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

          if (distance < (canvas.width/7) * (canvas.height/7)) {
            opacityValue = 1 - (distance/20000);
            ctx.strokeStyle = 'rgba(167, 139, 250,' + opacityValue + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    init();
    animate();
  }

  // ======================
  // Typing Effect
  // ======================
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");

  const textArray = ["Software Developer", "Python Enthusiast", "Full Stack Developer", "Tech Explorer"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  if (typedTextSpan) {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
  }
});
