const dermFeatureInit = () => {
  window.addEventListener("load", () => {
  console.log('test dermFeatureInit')
    if (!window.customElements.get('slider-df')) {
      class SliderDermFeature extends HTMLElement {
        constructor() {
          super();
        }
        connectedCallback() {
          const swiper = new Swiper(this.querySelector(".sdf"), {
            slidesPerView: 'auto',
            spaceBetween: 40,
            loop:true,
            centeredSlides: true,
            breakpoints:{
              600:{
                centeredSlides: false,
                loop:true
              }
            },
            pagination: {
              el: ".sdf-pagination",
              clickable: true,
            }
          });
        }
        
      }
      window.customElements.define('slider-df', SliderDermFeature);
    }
  });
}



export default dermFeatureInit;
