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

// Get the modal and image elements
const expandedImageContainer = document.getElementById('expanded-image');
const expandedImage = document.getElementById('expanded-img');
const closeButton = document.querySelector('.close-btn');

// Get all clickable images
const images = document.querySelectorAll('.clickable-image');

// Add event listeners to each image
images.forEach(image => {
    image.addEventListener('click', () => {
        expandedImage.src = image.src;  // Set the clicked image as the expanded image
        expandedImageContainer.style.display = 'flex';  // Show the expanded image container
    });
});

// Close the expanded image when the close button is clicked
closeButton.addEventListener('click', () => {
    expandedImageContainer.style.display = 'none';  // Hide the expanded image container
});

// Close the expanded image container if the user clicks outside the image
expandedImageContainer.addEventListener('click', (event) => {
    if (event.target === expandedImageContainer) {
        expandedImageContainer.style.display = 'none';  // Hide the expanded image container
    }
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

document.addEventListener("DOMContentLoaded", function() {
  const carouselItems = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  function showImage(index) {
    carouselItems.forEach((item, i) => {
      item.classList.remove('active');
      if (i === index) {
        item.classList.add('active');
      }
    });
  }

  // Set the first image as active by default
  showImage(currentIndex);

  // Handle next and previous buttons
  document.querySelector('.carousel-next').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showImage(currentIndex);
  });

  document.querySelector('.carousel-prev').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showImage(currentIndex);
  });

  // Optional: Auto-scroll every 5 seconds
  setInterval(function() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showImage(currentIndex);
  }, 5000);
});

document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(".carousel-container");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");
  const items = document.querySelectorAll(".portfolio-card");
  let currentIndex = 0;

  function updateCarousel() {
    const translateValue = -currentIndex * 100 + "%";
    carouselContainer.style.transform = "translateX(" + translateValue + ")";
  }

  nextButton.addEventListener("click", function () {
    if (currentIndex < items.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevButton.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Auto-scroll feature
  setInterval(() => {
    if (currentIndex < items.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }, 4000); // Change slides every 4 seconds
});

const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");
const carouselInner = document.querySelector(".carousel-inner");

let currentIndex = 0;
const totalSlides = document.querySelectorAll(".portfolio-card").length;

nextButton.addEventListener("click", () => {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // Loop back to first slide
  }
  updateCarousel();
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalSlides - 1; // Loop to last slide
  }
  updateCarousel();
});

function updateCarousel() {
  const offset = -currentIndex * 100; // Move carousel based on index
  carouselInner.style.transform = `translateX(${offset}%)`;
}


