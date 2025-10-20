'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Current variables
const CurrentItem = document.querySelectorAll("[data-Current-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const CurrentModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < CurrentItem.length; i++) {

  CurrentItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-Current-avatar]").src;
    modalImg.alt = this.querySelector("[data-Current-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-Current-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-Current-text]").innerHTML;

    CurrentModalFunc();

  });

}



// add click event to modal close button
modalCloseBtn.addEventListener("click", CurrentModalFunc);
overlay.addEventListener("click", CurrentModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
    // Reload the page if 'user research' is selected

  });
}

// Function to show project details
function showProjectDetails(projectId) {
  document.querySelectorAll('.project-details').forEach(el => el.style.display = 'none');
  document.getElementById(projectId + '-details').style.display = 'block';
  document.querySelector('.projects').style.display = 'none';
  document.querySelector('.projects2').style.display = 'none';
}

// Function to hide project details
function hideProjectDetails() {
  document.querySelectorAll('.project-details').forEach(el => el.style.display = 'none');
  document.querySelector('.projects').style.display = 'block';
}

// Add click event listeners to project links
document.querySelectorAll('[data-project-link]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showProjectDetails(link.getAttribute('data-project-link'));
  });
});

document.querySelectorAll('[data-project-link]').forEach(item => {
  item.addEventListener('click', event => {
    if (item.hasAttribute('data-modal')) {
      event.preventDefault();
      // Open modal (handled elsewhere)
    } else {
      // Existing navigation code
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const selectItems = document.querySelectorAll('[data-select-item]');
  const selectValue = document.querySelector('[data-select-value]');
  const projectItems = document.querySelectorAll('[data-filter-item]');

  function filterProjects(selectedValue) {
    projectItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      item.style.display = (selectedValue === 'all' || itemCategory === selectedValue) ? 'block' : 'none';
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.innerText.toLowerCase();
      selectValue.innerText = button.innerText; // Update select box display
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterProjects(filterValue);
    });
  });

  selectItems.forEach(item => {
    item.addEventListener('click', () => {
      const selectedValue = item.innerText.toLowerCase();
      selectValue.innerText = item.innerText; // Update select box display
      filterProjects(selectedValue);
    });
  });

  // Initially show all projects
  filterProjects('all');
});

// Open Modal
document.querySelectorAll('[data-modal]').forEach(item => {
  item.addEventListener('click', event => {
    event.preventDefault(); // Prevent default link behavior
    const modalId = item.getAttribute('data-modal');
    document.getElementById(modalId).style.display = 'block';
  });
});

// Close Modal
document.querySelectorAll('.close').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').style.display = 'none';
  });
});

// Close Modal When Clicking Outside
window.addEventListener('click', event => {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Get all certification links
  const certLinks = document.querySelectorAll('.certification-link');

  // Add click handlers to all links
  certLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = link.getAttribute('data-modal-target');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
      }
    });
  });

  // Get all close buttons
  const closeButtons = document.querySelectorAll('.close-modal');

  // Add click handlers to all close buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
});

// Remove existing event listeners from close buttons
const oldCloseButtons = document.querySelectorAll('.close-modal');
oldCloseButtons.forEach(button => {
  const newButton = button.cloneNode(true);
  button.parentNode.replaceChild(newButton, button);
});

function hideProjectDetails() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.style.display = 'none';
  });
}

const aiForm = document.getElementById('ai-form');
const userQuestion = document.getElementById('user-question');
const aiAnswer = document.getElementById('ai-answer');

const serverEndpoint = 'http://127.0.0.1:5000/your-api-endpoint'; // Correct endpoint

aiForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const question = userQuestion.value;
  aiAnswer.textContent = "Thinking...";

  try {
    const response = await fetch(serverEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: question })
    });

    if (!response.ok) {
      throw new Error(`Server request failed ${response.status}`);
    }

    const data = await response.json();
    aiAnswer.textContent = data.answer;

  } catch (error) {
    console.error('Error:', error);
    aiAnswer.textContent = `An error occurred. Please try again or contact me directly using the information on my portfolio. Working fast to fix it!`;
  }
});

const style = document.createElement('style');
style.textContent = `
  .modal-content {
    max-height: 85vh;
    overflow-y: auto;
    scroll-behavior: smooth;
    padding-right: 15px;
  }

  /* WebKit browsers (Chrome, Safari) */
  .modal-content::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  .modal-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  .modal-content::-webkit-scrollbar-thumb {
    background: rgba(136, 136, 136, 0.5);
    border-radius: 10px;
    transition: background 0.3s ease;
  }

  .modal-content::-webkit-scrollbar-thumb:hover {
    background: rgba(136, 136, 136, 0.8);
  }

  /* Firefox */
  .modal-content {
    scrollbar-width: thin;
    scrollbar-color: rgba(136, 136, 136, 0.5) rgba(255, 255, 255, 0.1);
  }

  /* Edge */
  .modal-content {
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
`;
document.head.appendChild(style);

// JavaScript code for certificate modals

// Function to initialize certificate modals
function initializeCertificateModals() {
  // Remove existing event listeners from certificate links
  const oldLinks = document.querySelectorAll('.certificate-link[data-modal-target]');
  oldLinks.forEach(link => {
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
  });

  // Select all certificate links that should open modals
  const certificateLinks = document.querySelectorAll('.certificate-link[data-modal-target]');

  // Function to open modal
  function openModal(modal) {
    if (modal == null) return;
    modal.style.display = 'block';
  }

  // Function to close modal
  function closeModal(modal) {
    if (modal == null) return;
    modal.style.display = 'none';
  }

  // Add event listeners to certificate links
  certificateLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault(); // Prevent default link behavior
      const modalId = link.getAttribute('data-modal-target');
      const modal = document.getElementById(modalId);
      openModal(modal);
    });
  });

  function initializePublicationModals() {
    // Open Modal
    document.querySelectorAll('[data-modal-target]').forEach(item => {
      item.addEventListener('click', event => {
        event.preventDefault(); // Prevent default link behavior
        const modalId = item.getAttribute('data-modal-target');
        document.getElementById(modalId).style.display = 'block';
      });
    });

  // Remove existing event listeners from close buttons
  const oldCloseButtons = document.querySelectorAll('.close-modal');
  oldCloseButtons.forEach(button => {
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
  });

  // Add event listeners to close buttons
  const closeModalButtons = document.querySelectorAll('.close-modal');
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal);
    });
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', event => {
    if (event.target.classList.contains('modal')) {
      closeModal(event.target);
    }
  });
}

// Function to handle navigation and reinitialize modals
function handleNavigation() {
  const navigationLinks = document.querySelectorAll('[data-nav-link]');
  navigationLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetPage = link.getAttribute('data-page');

      // Logic to display the target page...

      // Initialize modals if navigating to the certificates page
      if (targetPage === 'certificates') {
        // Use a small delay to ensure the content is loaded
        setTimeout(initializeCertificateModals, 100);
      }
    });
  });
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  initializeCertificateModals();
  handleNavigation();
});

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('[data-filter-item]');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active class on buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

function initializeCertificateModals() {
  // Add event listeners to open buttons
  const openModalButtons = document.querySelectorAll('[data-certificate-modal]');
  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-certificate-modal');
      const modal = document.getElementById(modalId);
      openModal(modal);
    });
  });

  // Add event listeners to close buttons within the modals
  const closeModalButtons = document.querySelectorAll('.close-modal');
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal);
    });
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', event => {
    if (event.target.classList.contains('modal')) {
      closeModal(event.target);
    }
  });
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

var canvas = document.getElementById('smoke-canvas');
var smoke = smokemachine(canvas, [20, 20, 20]);

function addSmoke(e) {
    smoke.addsmoke(e.clientX, e.clientY, 100, 2, 2000);
}

window.addEventListener('mousemove', throttle(addSmoke, 100));

function produceRandomSmoke() {
    smoke.addsmoke(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 30, 5000);
}

setInterval(produceRandomSmoke, 1000);
