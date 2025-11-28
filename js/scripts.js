// Project data
const projects = [
  {
    id: "virtual-home-builder",
    title: "Virtual 3D Home Builder",
    shortDescription: "3D visualization tool for home design",
    description: "A software tool that helps users design and view home layouts in 3D. It lets users upload blueprints to create 3D models, customize rooms, furniture, colors, and materials, and take virtual walkthroughs. The project uses 3D modeling and machine learning to make home planning easy, accurate, and interactive.",
    techStack: ["Python", "Django", "3D Modeling", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    demoLink: "#",
    githubLink: "#"
  },
  {
    id: "parking-system",
    title: "Online Car Parking Reservation System",
    shortDescription: "Web-based parking management system",
    description: "A web-based system that helps users find, book, and pay for parking spots in advance at malls and commercial areas. It shows real-time space availability and sends alerts to reduce time spent searching for parking. For mall operators, it helps manage parking better and track usage. The system improves customer experience and reduces traffic congestion.",
    techStack: ["Python", "Django", "JavaScript", "MySQL"],
    image:"https://i.pinimg.com/736x/3b/72/cd/3b72cdd2e3b2d7f21aa5dec606b8af88.jpg",
    demoLink: "#",
    githubLink: "#"
  },
];

// DOM Elements
const projectsGrid = document.querySelector('.projects-grid');
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content-container');
const closeModal = document.querySelector('.close-modal');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const contactForm = document.getElementById('contact-form');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const currentYearSpan = document.getElementById('current-year');
const toast = document.getElementById('toast');

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  currentYearSpan.textContent = new Date().getFullYear();
  
  // Load projects
  loadProjects();
  
  // Setup event listeners
  // setupEventListeners(); // Commented out to use the modified event listeners
  
  // Check for saved theme
  setInitialTheme();
  
  // Animate elements on scroll
  setupScrollAnimation();
});

// Load Projects
function loadProjects() {
  projects.forEach((project, index) => {
    const projectCard = createProjectCard(project);
    
    // Make the 4th project (index 3) take full width on larger screens
    if (index === 3) {
      projectCard.classList.add('featured-project');
    }
    
    projectsGrid.appendChild(projectCard);
  });
}

// Create Project Card
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.setAttribute('data-id', project.id);
  
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
  
  card.addEventListener('click', () => {
    openProjectModal(project);
  });
  
  return card;
}

// Open Project Modal
function openProjectModal(project) {
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
          ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
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
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Theme Toggle
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light');
    themeToggleBtn.querySelector('i').className = 'fas fa-sun';
} else {
    body.classList.remove('light');
    themeToggleBtn.querySelector('i').className = 'fas fa-moon';
}

// Toggle theme on button click
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    themeToggleBtn.querySelector('i').className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Scroll to Top

window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (window.pageYOffset > 100) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Update Copyright Year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Project Modal Handling


const modalContentContainer = document.getElementById('modal-content-container');


if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// // Form Submission
// const contactFormElement = document.getElementById('contact-form');
// if (contactFormElement) {
//     contactFormElement.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const formData = new FormData(contactFormElement);
//         const data = Object.fromEntries(formData);

//         try {
//             const response = await fetch('/api/contact', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (response.ok) {
//                 showToast('Message sent successfully!');
//                 contactFormElement.reset();
//             } else {
//                 showToast('Failed to send message. Please try again.');
//             }
//         } catch (error) {
//             showToast('An error occurred. Please try again later.');
//         }
//     });
// }

// // Toast Notification
// function showToast(message) {
//     const toast = document.createElement('div');
//     toast.className = 'toast';
//     toast.innerHTML = `
//         <div class="toast-content">
//             <div class="toast-icon">
//                 <i class="fas fa-check-circle"></i>
//             </div>
//             <div class="toast-message">${message}</div>
//         </div>
//         <div class="toast-progress"></div>
//     `;
//     document.body.appendChild(toast);

//     setTimeout(() => {
//         toast.remove();
//     }, 3000);
// }
// // Set Initial Theme
// function setInitialTheme() {
//   const savedTheme = localStorage.getItem('theme');
  
//   if (savedTheme === 'light') {
//     document.body.classList.add('light');
//     themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
//   } else {
//     document.body.classList.remove('light');
//     themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
//   }
// }

// // Setup Scroll Animation
// function setupScrollAnimation() {
//   // Animate cards and sections
//   const elementsToAnimate = document.querySelectorAll('.skills-card, .project-card, .education-card, .experience-card, .contact-form-container, .resume-card');
  
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add('animate-fade-in');
//         observer.unobserve(entry.target);
//       }
//     });
//   }, {
//     threshold: 0.1
//   });
  
//   elementsToAnimate.forEach(element => {
//     observer.observe(element);
//   });
  
//   // Animate skill bars when they come into view
//   const skillBars = document.querySelectorAll('.skill-progress');
  
//   const skillObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         const width = entry.target.style.width;
//         entry.target.style.width = '0';
        
//         setTimeout(() => {
//           entry.target.style.transition = 'width 1s ease-in-out';
//           entry.target.style.width = width;
//         }, 200);
        
//         skillObserver.unobserve(entry.target);
//       }
//     });
//   }, {
//     threshold: 0.5
//   });
  
//   skillBars.forEach(bar => {
//     skillObserver.observe(bar);
//   });
// }