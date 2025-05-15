/**
* Template Name: Folio - v4.7.0
* Template URL: https://bootstrapmade.com/folio-bootstrap-portfolio-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper('.services-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()

function showImage(element) {
  var imageDiv = element.nextElementSibling;
  imageDiv.style.display = imageDiv.style.display === 'none' || imageDiv.style.display === '' ? 'block' : 'none';
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (!form) {
    console.error("Form not found in the document.");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the default form submission
    const formData = new FormData(form); // Gather form data

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json", // Ensure response is expected in JSON format
        },
      });

      if (response.ok) {
        form.innerHTML = `<p>Thank you for your message! We'll get back to you soon.</p>`;
      } else {
        const errorData = await response.json();
        const errorMessage = errorData?.error || "Something went wrong. Please try again.";
        form.innerHTML = `<p>${errorMessage}</p>`;
      }
    } catch (error) {
      console.error("Error during form submission:", error); // Log the error for debugging
      form.innerHTML = `<p>Oops! Something went wrong. Please try again later.</p>`;
    }
  });
});


// Filter portfolio items based on category
document.querySelectorAll('#portfolio-flters li').forEach((filter) => {
  filter.addEventListener('click', () => {
    const filterValue = filter.textContent.toLowerCase();
    document.querySelectorAll('.portfolio-item').forEach((item) => {
      const itemCategory = item.querySelector('img').getAttribute('alt').toLowerCase();
      if (filterValue === 'all' || itemCategory.includes(filterValue)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    document.querySelectorAll('#portfolio-flters li').forEach((el) => {
      el.classList.remove('filter-active');
    });
    filter.classList.add('filter-active');
  });
});

// Additional carousel logic for handling next/prev buttons and auto-scrolling
document.addEventListener("DOMContentLoaded", function() {
  const carouselItems = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  function showImage(index) {
    carouselItems.forEach((item, i) => {
      item.style.display = (i === index) ? 'block' : 'none';
    });
  }

  document.querySelector('.carousel-prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
    showImage(currentIndex);
  });

  document.querySelector('.carousel-next').addEventListener('click', () => {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    showImage(currentIndex);
  });

  setInterval(() => {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    showImage(currentIndex);
  }, 3000);

  showImage(currentIndex); // Show the first image initially
});

// JavaScript for enlarging images when clicked outside the "More Details" box
const portfolioItems = document.querySelectorAll('.portfolio-item img');
const body = document.body;

portfolioItems.forEach(item => {
  item.addEventListener('click', function(event) {
    const imgSrc = event.target.src;
    const modal = document.createElement('div');
    modal.classList.add('image-modal');
    const img = document.createElement('img');
    img.src = imgSrc;
    img.classList.add('enlarged-image');
    modal.appendChild(img);
    body.appendChild(modal);
    
    modal.addEventListener('click', () => {
      modal.remove(); // Removes the modal when clicked
    });
  });
});

// Adding some styles for the modal dynamically
const style = document.createElement('style');
style.innerHTML = `
  .image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .enlarged-image {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
  .enlarged-image:hover {
    transform: scale(1.05);
  }
`;
document.head.appendChild(style);

// Lightbox functionality
document.querySelectorAll("#portfolio .portfolio-item img").forEach(img => {
  img.addEventListener("click", function() {
    openLightbox(this.src);
  });
});

function openLightbox(src) {
  let lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  lightbox.innerHTML = `
    <span class="close" onclick="document.body.removeChild(this.parentElement)">&times;</span>
    <img src="${src}" alt="Enlarged Image">
  `;
  document.body.appendChild(lightbox);
}

function openModal() {
  var activeSlide = document.querySelector(".swiper-slide-active img"); // Get active image
  if (!activeSlide) return;

  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImg");

  modal.style.display = "flex";
  modalImg.src = activeSlide.src;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

// Initialize Swiper with pagination dots
var swiper = new Swiper('.swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// Open Modal on Button Click
function openModal() {
  var activeSlide = document.querySelector(".swiper-slide-active img"); // Get active image
  if (!activeSlide) return;

  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImg");

  modal.style.display = "flex";
  modalImg.src = activeSlide.src;
}

// Close Modal
function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}


var swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 3000, // Auto-scroll every 3 seconds
    disableOnInteraction: false, // Continues autoplay even after clicking
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: false, // Ensures all bullets are always visible
  },
});

function openModal() {
  var modal = document.getElementById("imageModal");
  var img = document.querySelector(".swiper-slide-active img"); // Get currently active image
  var modalImg = document.getElementById("modalImg");
  modal.style.display = "flex";
  modalImg.src = img.src;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

var swiper = new Swiper(".portfolio-details-slider", {
  loop: true,
  autoplay: {
    delay: 5000, // Increase delay for better readability
    disableOnInteraction: false,
  },
  speed: 1200, // Slows down transition for smooth effect
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  slidesPerView: 1, // Ensures only one slide is visible at a time
  spaceBetween: 0, // Prevents overlap or partial visibility
  centeredSlides: true, // Keeps the active slide centered
  effect: "slide", // Ensures a smooth sliding effect
  allowTouchMove: true, // Enables user interaction without breaking autoplay
  loopAdditionalSlides: 1, // Prevents glitches when looping
  longSwipes: true, // Ensures intentional swipes
  longSwipesRatio: 0.5, // Adjusts swipe threshold
  preventInteractionOnTransition: true, // Prevents rapid swipes from skipping images
});


function openModal() {
  var modal = document.getElementById("imageModal");
  var img = document.querySelector(".swiper-slide-active img"); // Get currently active image
  var modalImg = document.getElementById("modalImg");
  modal.style.display = "flex";
  modalImg.src = img.src;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".pictures img");

  images.forEach(img => {
      img.addEventListener("mouseover", function () {
          this.style.filter = "brightness(1.2)";
      });

      img.addEventListener("mouseout", function () {
          this.style.filter = "brightness(1)";
      });
  });
});

var swiper = new Swiper(".services-slider", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 800,
  effect: "slide",
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 }
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const viewButtons = document.querySelectorAll(".view-image-btn");
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeModal = document.querySelector(".close-modal");

  viewButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const img = this.previousElementSibling; // Get the corresponding image
      modalImage.src = img.src;
      modal.style.display = "flex";
    });
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

function showUI(type) {
  const title = document.getElementById('uiTitle');
  const description = document.getElementById('uiDescription');

  if (type === 'inventory') {
      title.innerText = "Inventory UI";
      description.innerText = "Explore a collection of unique Inventory UI designs, tailored to different game styles...";
  } else if (type === 'battlepass') {
      title.innerText = "Battle Pass UI";
      description.innerText = "An innovative Battle Pass UI experience that enhances progression tracking...";
  }
}


ddocument.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".ui-tab").forEach(button => {
      button.addEventListener("click", function(event) {
          event.preventDefault(); // Prevent default link behavior
          const targetPage = this.getAttribute("href");
          window.location.assign(targetPage); // Navigate to the page
      });
  });
});


var swiper = new Swiper(".swiper", {
  loop: true,
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper
  const swiper = new Swiper('.swiper', {
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // Get the lock button and video elements
  const lockButtons = document.querySelectorAll('.lock-button');
  const videos = document.querySelectorAll('.portfolio-video');

  // Function to disable swiper pagination when video is playing
  function lockSwiper() {
    swiper.allowTouchMove = false; // Disable swipe interactions
    swiper.pagination.disable(); // Disable pagination
  }

  // Function to unlock swiper when video ends
  function unlockSwiper() {
    swiper.allowTouchMove = true; // Re-enable swipe interactions
    swiper.pagination.enable(); // Enable pagination
  }

  // Set up event listeners for all videos
  videos.forEach((video) => {
    // Lock swiper when video is played
    video.addEventListener('play', function () {
      lockSwiper();
    });

    // Unlock swiper when video ends
    video.addEventListener('ended', function () {
      unlockSwiper();
    });
  });

  // Button click handler to lock or unlock swiper
  lockButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Check if the swiper is locked or not
      if (swiper.allowTouchMove) {
        lockSwiper(); // Lock swiper
        button.textContent = "Unlock Video"; // Change button text
      } else {
        unlockSwiper(); // Unlock swiper
        button.textContent = "Lock Video"; // Change button text
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.video-slide');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  }

  nextBtn.addEventListener('click', () => {
    if (current < slides.length - 1) {
      current++;
      showSlide(current);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (current > 0) {
      current--;
      showSlide(current);
    }
  });

  // Optional: Disable buttons while playing
  slides.forEach(slide => {
    const video = slide.querySelector('video');
    video.addEventListener('play', () => {
      nextBtn.disabled = true;
      prevBtn.disabled = true;
    });
    video.addEventListener('ended', () => {
      nextBtn.disabled = false;
      prevBtn.disabled = false;
    });
    video.addEventListener('pause', () => {
      nextBtn.disabled = false;
      prevBtn.disabled = false;
    });
  });

  // Initialize with the first slide
  showSlide(current);
});

document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("videoTrack");
  const slides = document.querySelectorAll(".video-slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  let index = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  updateCarousel();
});

function openModalFromButton(button) {
  const slider = button.closest('.row').querySelector('.swiper');
  const activeSlide = slider.querySelector('.swiper-slide.swiper-slide-active img');

  if (activeSlide) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = activeSlide.src;
    modalImg.alt = activeSlide.alt || "Enlarged Image";
  }
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

function openImageModal(imgElement) {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImage");
  modal.style.display = "block";
  modalImg.src = imgElement.src;
}

function closeImageModal() {
  document.getElementById("imageModal").style.display = "none";
}

// Optional: Close modal on outside click
window.onclick = function(event) {
  var modal = document.getElementById("imageModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

function changeImage(imageSrc) {
  document.getElementById('displayedImage').src = imageSrc;
}



function changeInventoryImage(imagePath) {
  document.getElementById('inventoryDisplayedImage').src = imagePath;
}

function changeProductImage(imagePath) {
  document.getElementById('productDisplayedImage').src = imagePath;
}

function changeWebImage(imagePath) {
  document.getElementById('webDisplayedImage').src = imagePath;
}

function changeBrandingImage(imagePath) {
  document.getElementById('brandingDisplayedImage').src = imagePath;
}

function changeGraphicImage(imagePath) {
  document.getElementById('graphicDesignDisplayedImage').src = imagePath;
}

function changeConceptImage(imagePath) {
  document.getElementById('conceptDesignDisplayedImage').src = imagePath;
}

function changeBattlePassImage(imagePath) {
  document.getElementById('battlePassDisplayedImage').src = imagePath;
}

document.addEventListener('DOMContentLoaded', function() {
  const gamesTabButton = document.getElementById('games-tab');
  const miscTabButton = document.getElementById('misc-tab');

  // Activate the respective tabs
  gamesTabButton.addEventListener('click', function() {
      const gamesTab = new bootstrap.Tab(gamesTabButton);
      gamesTab.show();
  });

  miscTabButton.addEventListener('click', function() {
      const miscTab = new bootstrap.Tab(miscTabButton);
      miscTab.show();
  });

  // Optionally, you can programmatically activate a tab when the page loads.
  new bootstrap.Tab(gamesTabButton).show(); // Activate the "Video Game Box Covers" tab by default
});

function changeImage(imageSrc) {
  var displayedImage = document.getElementById("displayedImage");
  displayedImage.src = imageSrc;
}

function changeImage(imageSrc) {
  document.getElementById("displayedImage").src = imageSrc;
}
function changeSliderImage(newSrc) {
  const mainImage = document.getElementById('sliderDisplayedImage');
  if (mainImage) {
    mainImage.src = newSrc;
  }
}
