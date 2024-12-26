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
          this.clickVideo()
        }
        clickVideo(){
          const slides = this.querySelectorAll('.video-cont') ;
          if(slides.length > 0){
            slides.forEach((slide) => {
              slide.addEventListener('click', () => {
                const overlay = this.querySelector('.overlay-popup-sdf')
                const videoCont = this.querySelector(`.pwd-video[data-index="${ slide.dataset.index }"]`)
                videoCont.dataset.active = 'true';
                overlay.classList.remove('hidden')
                videoCont.classList.remove('hidden')
              })
            })
          }
          

          const videos = this.querySelectorAll('.pwd-video video')
          if(videos.length > 0){
            videos.forEach((video) => {
              video.addEventListener('click', (event) => {
                event.stopPropagation();
              })
            })
          }
          

          const overlay = this.querySelector('.overlay-popup-sdf')
          overlay.addEventListener('click', () => {
            const videoCont = this.querySelector('.pwd-video[data-active="true"]')
            const video = this.querySelector('.pwd-video[data-active="true"] video')
            const iframe = this.querySelector('.pwd-video[data-active="true"] iframe')

            if(video) video.pause();
            
            if(iframe){
              const iframeCopy = iframe.cloneNode(true)
              videoCont.innerHTML = ''
              videoCont.appendChild(iframeCopy)
            }
            overlay.classList.add('hidden')
            videoCont.classList.add('hidden')
            videoCont.dataset.active = 'false';
          })

        }
      }
      window.customElements.define('slider-df', SliderDermFeature);
    }
  });
}
export default dermFeatureInit;
