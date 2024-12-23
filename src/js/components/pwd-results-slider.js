const resultsSliderInit = () => {
  window.addEventListener("load", () => {
    let swiper = new Swiper(".pwd-result_slider", {
      spaceBetween: 38,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        centeredSlides:true,
      },
      breakpoints: {
        556: {
          slidesPerView: 1,
          centeredSlidesBounds:true,
        },
        768: {
          slidesPerView: 2,
          centeredSlides:false,
        },
        1024: {
          slidesPerView: 3,
          centeredSlides:false,
        },
      },
    });
  });
}
export default resultsSliderInit;
