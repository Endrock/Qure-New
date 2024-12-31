const lifestyleInit = ()=>{
  window.addEventListener("load", () => {
    if (!window.customElements.get('cards-tips')) {
      class CardsTips extends HTMLElement {

        static get observedAttributes() {
          return ['active-card'];
        }

        constructor() {
          super();
          this.cards = [];
        }

        connectedCallback() {
          this.updateCards();
          this.paginationClick();
          this.arrowsClick();
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if (name === 'active-card') {
            this.changeCard(oldValue, newValue);
          }
        }

        updateCards() {
          this.cards = Array.from(this.querySelectorAll('.card'));
        }

        paginationClick() {
          const btnsCards = this.querySelectorAll('.pagination .num');
          if(btnsCards.length < 1) return ;
          btnsCards.forEach((btn) => {
            btn.addEventListener('click',() => {
              this.setAttribute('active-card', btn.dataset.card);
            })
          })
        }

        arrowsClick() {
          const btnsNext = this.querySelectorAll('.next')
          const btnsPrevieus = this.querySelectorAll('.previous')

          if( btnsNext.length < 1 && btnsPrevieus < 1) return ;

          btnsNext.forEach((btn) => {
            btn.addEventListener('click',() => {
              const nextCard = parseInt(this.getAttribute('active-card')) + 1;
              if( nextCard > this.cards.length ) return ;
              this.setAttribute('active-card', nextCard)
            })
          });

          btnsPrevieus.forEach((btn) => {
            btn.addEventListener('click',() => {
              const previousCard = parseInt(this.getAttribute('active-card')) - 1;
              if( previousCard < 1 ) return ;
              this.setAttribute('active-card', previousCard)
            })
          });
        }

        changeCard(oldValue, newValue) {

          if (!newValue || !oldValue || newValue === oldValue) return ;

          if (!this.cards.length) this.updateCards();

          const activatedCard = this.querySelector(`.card[index="${newValue}"]`);
          const desactivatedCard = this.querySelector(`.card[index="${oldValue}"]`);

          if (activatedCard === desactivatedCard) return;
          if (!activatedCard) return;

          if (!desactivatedCard) {
            this.cards.forEach((card) => {
              card.classList.remove('active');
            });
          } else {
            desactivatedCard.classList.remove('active');
          }

          if (activatedCard) {
            activatedCard.classList.add('active');
          }
        }
      }
      window.customElements.define('cards-tips', CardsTips);
    }
  });
}

const regimenInit = () => {
  window.addEventListener("load", () => {
    if (!window.customElements.get('regimen-steps')) {
      class RegimenSteps extends HTMLElement {
        static get observedAttributes() {
          return ['active-step'];
        }

        constructor() {
          super();
          this.steps = [];
          this.tabs = [];
        }

        connectedCallback() {
          this.updateSteps();
          this.paginationClick();
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if (name === 'active-step') {
            this.changeStep(oldValue, newValue);
          }
        }

        updateSteps() {
          this.steps = Array.from(this.querySelectorAll('.step'));
          this.tabs = Array.from(this.querySelectorAll('.tab'));
        }

        paginationClick() {
          if(this.tabs.length < 1) return ;
          this.tabs.forEach((tab) => {
            tab.addEventListener('click',() => {
              this.setAttribute('active-step', tab.getAttribute('index') );
            })
          })
        }

        changeStep(oldValue, newValue) {
          if (!newValue || !oldValue || newValue === oldValue) return ;

          if (!this.steps.length && !this.tabs.length ) this.updateSteps();

          const activatedStep = this.querySelector(`.step[index="${newValue}"]`);
          const desactivatedStep = this.querySelector(`.step[index="${oldValue}"]`);

          const activatedTab = this.querySelector(`.tab[index="${newValue}"]`);
          const desactivatedTab = this.querySelector(`.tab[index="${oldValue}"]`);


          if (activatedStep === desactivatedStep) return;
          if (!activatedStep) return;

          if (activatedTab === desactivatedTab) return;
          if (!activatedTab) return;

          if (!desactivatedStep) {
            this.steps.forEach((step) => {
              step.classList.remove('active');
            });
          } else {
            desactivatedStep.classList.remove('active');
          }

          if (!desactivatedTab) {
            this.tabs.forEach((tab) => {
              tab.classList.remove('active');
            });
          } else {
            desactivatedTab.classList.remove('active');
          }

          if (activatedStep) {
            activatedStep.classList.add('active');
          }

          if (activatedTab) {
            activatedTab.classList.add('active');
          }
        }
      }
      window.customElements.define('regimen-steps', RegimenSteps);
    }
  });
}

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

const dermFeatureInit = () => {
  window.addEventListener("load", () => {
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

const dualTextImgInit = () => {
  window.addEventListener("load", () => { 
    const btns = document.querySelectorAll('.cont-btn')
    if(btns.length < 1 ) return ;
    btns.forEach((btn) => {
      btn.addEventListener('click', () =>{
        const textBody = document.querySelector(`.text-body[data-id="${ btn.dataset.id }"]`)
        if(!textBody)return;
        if(textBody.dataset.open === "false"){
          textBody.dataset.open = "true"
        }else{
          textBody.dataset.open = "false"
        }
      })
    })
  })
}

dualTextImgInit();
dermFeatureInit();
resultsSliderInit();
regimenInit();
lifestyleInit();
