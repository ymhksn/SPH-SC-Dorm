// Your JavaScript code goes here
console.log("Hello, world!");

// Add event listener to scroll links
document.querySelectorAll(".scroll-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetElement = document.querySelector(this.getAttribute("href"));
    const targetOffsetTop = targetElement.offsetTop - 128;

    window.scrollTo({
      top: targetOffsetTop,
      behavior: "smooth",
    });
  });
});

const offcanvasElementList = document.querySelectorAll(".offcanvas");
const offcanvasList = [...offcanvasElementList].map(
  (offcanvasEl) => new bootstrap.Offcanvas(offcanvasEl)
);

const offcanvasElement = document.getElementById("offcanvasResponsive");
const closeOffCanvasLinks = document.querySelectorAll(".closeOffCanvas");

closeOffCanvasLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Close the offcanvas menu and overlay using Bootstrap methods
    const offcanvasElement = document.getElementById("offcanvasResponsive");
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvasInstance.hide();

    const overlayElement = document.querySelector(".offcanvas-overlay");
    overlayElement.classList.remove("show");

    const targetElement = document.querySelector(this.getAttribute("href"));
    const targetOffsetTop = targetElement.offsetTop - 100;

    window.scrollTo({
      top: targetOffsetTop,
      behavior: "smooth",
    });
  });
});

// Parallax speeds for each box (higher = moves faster)
const parallaxSpeeds = [0.05, 0.1, 0.07, 0.02, -0.1, -0.05, -0.2, -0.1];

function parallaxBoxes() {
    const scrollY = window.scrollY;
    for (let i = 1; i <= 8; i++) {
        const box = document.querySelector('.boxMainBanner' + i);
        if (box) {
            // Move up/down with different speeds
            box.style.transform = `translateY(${scrollY * parallaxSpeeds[i-1]}px)`;
        }
    }
}
window.addEventListener('scroll', parallaxBoxes);

// GALLERY HORIZONTAL BUTTON AND AUTO PLAY
/* SET IMAGE SLIDER HEIGHT */
const slideImagerImages = document.querySelector('.slideImagerImages');
const slideImages = document.querySelectorAll('.slideImage');
let currentIndex = 0;
let autoslideImageInterval;
let slideImagerImagesWidth = slideImages[0] ? slideImages[0].offsetWidth : 0;

function nextslideImage() {
  currentIndex = (currentIndex + 1) % slideImages.length;
  updateslideImagerImages();
}

function prevslideImage() {
  currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
  updateslideImagerImages();
}

function updateslideImagerImages() {
  if (!slideImagerImages || slideImages.length === 0) return;
  const activeslideImageOffset = -(slideImages[currentIndex].offsetLeft - (slideImagerImages.clientWidth - slideImagerImagesWidth) / 2);

  if (currentIndex === slideImages.length - 1 && !slideImagerImages.style.transition) {
    slideImagerImages.style.transition = 'none';
    slideImagerImages.style.transform = `translateX(0px)`;

    setTimeout(() => {
      slideImagerImages.style.transition = 'transform 0.5s ease-in-out';
      currentIndex = 0;
      updateslideImagerImages();
    }, 0);
  } else {
    slideImagerImages.style.transform = `translateX(${activeslideImageOffset}px)`;
  }

  updateslideImageVisibility(); // Call the function to update slideImage visibility
  updateslideImageSize();
}

function updateslideImageVisibility() {
  slideImages.forEach((slideImage, index) => {
    if (index === currentIndex || (index === currentIndex - 1 && currentIndex === 0)) {
      slideImage.classList.remove('inactive');
    } else {
      slideImage.classList.add('inactive');
    }
  });
}

function updateslideImageSize() {
  slideImages.forEach((slideImage, index) => {
    if (index === currentIndex) {
      slideImage.style.transform = 'scale(1.2)'; // Increase size for the active slideImage
    } else {
      slideImage.style.transform = 'scale(0.8)'; // Reset size for inactive slideImages
    }
  });
}

// Auto-slideImage functionality
function startAutoslideImage() {
  autoslideImageInterval = setInterval(() => {
    nextslideImage();
  }, 3000); // Change slideImage every 3 seconds (adjust as needed)
}

function stopAutoslideImage() {
  clearInterval(autoslideImageInterval);
}

// Start auto-slideImage when the page loads
if (slideImagerImages && slideImages.length > 0) {
  startAutoslideImage();

  // Pause auto-slideImage on hover (optional)
  slideImagerImages.addEventListener('mouseover', stopAutoslideImage);
  slideImagerImages.addEventListener('mouseout', startAutoslideImage);

  // Loop back to the first image after any slideImage
  function checkLastslideImage() {
    if (currentIndex === slideImages.length - 1 || currentIndex === 0) {
      setTimeout(() => {
        currentIndex = 1; // Start from the second image
        updateslideImagerImages();
      }, 500); // Delay before looping to the second slideImage
    }
  }

  // Listen for the end of the transition to check for the last slideImage
  slideImagerImages.addEventListener('transitionend', checkLastslideImage);

  // Recalculate slideImagerImagesWidth when the window is resized
  window.addEventListener('resize', () => {
    slideImagerImagesWidth = slideImages[currentIndex] ? slideImages[currentIndex].offsetWidth : 0;
    updateslideImagerImages();
  });

  // Initial positioning and sizing
  updateslideImagerImages();
}