/**
 * This script conditionally removes specific carousel slides and thumbnails 
 * based on configuration flags. Each slide is identified by a custom 
 * `data-pdm-slider-test` attribute. Useful for dynamically showing or hiding
 * certain media items without modifying the Liquid structure.
 *
 * Used in: Product carousel with unified images.
 * 
 */

document.addEventListener('DOMContentLoaded', function () {
    const showCustomSlides = false;
  
    const customSlides = [
      'neck-v2',
      'microinfusion-v2',
      'led-mask-v2'
    ];
  
    if (!showCustomSlides) {
      customSlides.forEach(slideKey => {
        const slide = document.querySelector(`.swiper-products-carousel .swiper-slide[data-pdm-slider-test="${slideKey}"]`);
        const thumb = document.querySelector(`.swiper-products-thumbs__container .swiper-slide[data-pdm-slider-test="${slideKey}"]`);
  
        slide?.remove();
        thumb?.remove();
      });
    }
  });