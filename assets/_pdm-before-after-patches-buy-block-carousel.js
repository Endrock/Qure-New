/* start patches buy block carousel */
/**
 * Initializes the main carousel for the patches before/after gallery in the buy block
 * Creates two synchronized Swiper instances: a thumbnail slider and a main image slider
 *
 * @function initPatchesCarouselBuyBlock
 * @returns {void}
 */
function initPatchesCarouselBuyBlock() {
  // Select DOM elements for thumbnail container and media container
  const productThumbsContainer = document.querySelector('.patches-before-after-carousel-container.before-after-carousel-container .swiper-products-thumbs__container');
  const productMediaContainer = document.querySelector('.patches-before-after-carousel-container.before-after-carousel-container .swiper-products-carousel');

  // Exit function if required elements don't exist
  if (!productThumbsContainer || !productMediaContainer) return;

  // Initialize thumbnail slider
  let thumbSlider = new Swiper(productThumbsContainer, {
    loop: false,
    spaceBetween: 8,
    slidesPerView: 'auto',
    mousewheel: {
      forceToAxis: true,
    },
    // Responsive breakpoints
    breakpoints: {
      767: {
        spaceBetween: 12
      },
    },
  });

  // Initialize main image slider connected to thumbnail slider
  let mainSlider = new Swiper(productMediaContainer, {
    loop: false,
    slidesPerView: 1,
    mousewheel: {
      forceToAxis: true,
    },
    // Connect to thumbnail slider
    thumbs: {
      swiper: thumbSlider,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".patches-before-after-carousel-container.before-after-carousel-container .swiper-products-thumbs-next",
      prevEl: ".patches-before-after-carousel-container.before-after-carousel-container .swiper-products-thumbs-prev",
    },
  });

  // Expose slider control to global scope for external access
  window.patchesCarousel = {
    /**
     * Navigate to a specific slide in the carousel
     * 
     * @param {number} slideIndex - Index of the slide to navigate to
     * @returns {void}
     */
    goToSlide: function(slideIndex) {
      mainSlider.slideTo(slideIndex);
    }
  };
}

// Initialize the carousel test when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initPatchesCarouselBuyBlock);
// end patches buy block carousel