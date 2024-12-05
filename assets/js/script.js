'use strict';

document.addEventListener("DOMContentLoaded", function() {
  // Video/PDF modal variables
  const videoModalContainer = document.querySelector("[data-video-modal-container]");
  const videoOverlay = document.querySelector("[data-video-overlay]");
  const videoModalCloseBtn = document.querySelector("[data-video-modal-close-btn]");
  const modalContent = document.querySelector("[data-modal-content]");
  const projectItems = document.querySelectorAll(".project-item[data-modal-type][data-modal-url]");

  // Function to toggle modal
  const toggleModal = function () {
    const isActive = videoModalContainer.classList.toggle("active");
    videoOverlay.classList.toggle("active");
    
    if (!isActive) {
      // When closing the modal, clear the content
      modalContent.innerHTML = "";
    }
  }

  // Function to open modal with appropriate content
  const openModalWithContent = function (type, url) {
    toggleModal();

    if (type === "video") {
      // Embed Vimeo Video
      modalContent.innerHTML = `
        <iframe src="${url}" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" allowfullscreen title="Demo Video"></iframe>
      `;
    } else if (type === "pdf") {
      // Embed PDF
      modalContent.innerHTML = `
        <iframe src="${url}" width="100%" height="600px">
          This browser does not support PDFs. Please download the PDF to view it: <a href="${url}">Download PDF</a>.
        </iframe>
      `;
    } else {
      // Fallback content
      modalContent.innerHTML = `<p>Content type not supported.</p>`;
    }
  }

  // Add click event to all project items
  projectItems.forEach(function(item) {
    item.addEventListener("click", function () {
      const type = this.getAttribute("data-modal-type");
      const url = this.getAttribute("data-modal-url");
      openModalWithContent(type, url);
    });
  });

  // Add click event to close button and overlay
  videoModalCloseBtn.addEventListener("click", toggleModal);
  videoOverlay.addEventListener("click", toggleModal);

  // Keyboard accessibility: Close modal on 'Escape' key
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && videoModalContainer.classList.contains("active")) {
      toggleModal();
    }
  });

  // Element toggle function for other functionalities
  const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

  // Sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebar && sidebarBtn) {
    // Sidebar toggle functionality for mobile
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
  }

  // Testimonials variables
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  // Modal variables
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  if (testimonialsItem.length && modalContainer && modalCloseBtn && overlay && modalImg && modalTitle && modalText) {
    // Modal toggle function
    const testimonialsModalFunc = function () {
      modalContainer.classList.toggle("active");
      overlay.classList.toggle("active");
    }

    // Add click event to all testimonial items
    testimonialsItem.forEach(function(item) {
      item.addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

        testimonialsModalFunc();
      });
    });

    // Add click event to modal close button and overlay
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
    overlay.addEventListener("click", testimonialsModalFunc);
  }

  // Custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  if (select && selectItems.length && selectValue) {
    select.addEventListener("click", function () { elementToggleFunc(this); });

    // Add event to all select items
    selectItems.forEach(function(item) {
      item.addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    });
  }

  // Filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = function (selectedValue) {
    filterItems.forEach(function(item) {
      if (selectedValue === "all") {
        item.classList.add("active");
      } else if (selectedValue === item.dataset.category.toLowerCase()) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Add event to all filter button items for large screen
  if (filterBtn.length) {
    let lastClickedBtn = filterBtn[0];

    filterBtn.forEach(function(btn) {
      btn.addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    });
  }

  // Contact form variables
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (form && formInputs.length && formBtn) {
    // Add event to all form input fields
    formInputs.forEach(function(input) {
      input.addEventListener("input", function () {
        // Check form validation
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    });
  }

  // Page navigation variables
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  if (navigationLinks.length && pages.length) {
    // Add event to all nav links
    navigationLinks.forEach(function(link, index) {
      link.addEventListener("click", function () {
        pages.forEach(function(page, pageIndex) {
          if (index === pageIndex) {
            page.classList.add("active");
            navigationLinks[index].classList.add("active");
            window.scrollTo(0, 0);
          } else {
            page.classList.remove("active");
            navigationLinks[pageIndex].classList.remove("active");
          }
        });
      });
    });
  }

});
