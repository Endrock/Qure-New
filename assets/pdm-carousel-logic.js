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
  const showCustomSlides = document.body.hasAttribute('data-pdm-activation-slider');

  const customSlides = [
    'neck-v2',
    'microinfusion-v2',
    'led-mask-v2'
  ];

  const carousel = document.querySelector('.swiper-products-carousel .swiper-wrapper');
  const thumbs = document.querySelector('.swiper-products-thumbs__container .swiper-wrapper');

  customSlides.forEach(slideKey => {
    const slide = document.querySelector(`.swiper-products-carousel .swiper-slide[data-pdm-slider-test="${slideKey}"]`);
    const thumb = document.querySelector(`.swiper-products-thumbs__container .swiper-slide[data-pdm-slider-test="${slideKey}"]`);

    if (!showCustomSlides) {
      slide?.remove();
      thumb?.remove();
    } else {
      if (slide && carousel) {
        carousel.insertBefore(slide, carousel.firstChild);
      }

      if (thumb && thumbs) {
        thumbs.insertBefore(thumb, thumbs.firstChild);
      }
    }
  });
});