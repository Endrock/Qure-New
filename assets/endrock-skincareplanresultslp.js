const getUserName = () => {
  console.log('getUserName')
  const urlParams = new URLSearchParams(window.location.search)
  const userName = urlParams.get('name');

  if(!userName)return;
  console.log('name',  userName )
  const elements = document.querySelectorAll('.user-name');
  if(elements.length < 1)return;
  console.log('elements', elements)
  elements.forEach((elem) => {
    const name = elem.querySelector('.name');
    if(name){
      name.innerText = userName 
      elem.classList.remove('hidden')
    }
  })
}


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

const productsBundleInit = ()=>{
  window.addEventListener("load", () => {
    if (!window.customElements.get('products-bundle')) {
      class productsBundle extends HTMLElement {

        static get observedAttributes() {
          return ['data-bundle-array'];
        }

        constructor() {
          super();
        }

        connectedCallback() {
          this.mediaTab();
          this.addProductToBundle();
          this.displayPopup();
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if(name == 'data-bundle-array'){
            this.changeArrayBundle(oldValue,newValue);
          }
        }
        mediaTab(){
          const cards = this.querySelectorAll('.card-bundle')
          cards.forEach((card) => { 
            const btns = card.querySelectorAll('.media-btns div')
            btns.forEach((btn) => {
              btn.addEventListener('click',() => {
                const medias = card.querySelectorAll('.media .src')
                medias.forEach((media) => {
                  media.classList.add('hidden')
                })
                btns.forEach((btn) => {
                  btn.classList.remove('active')
                })
                const showMedia = card.querySelector(`.media .${ btn.dataset.ref }`)
                showMedia.classList.remove('hidden')
                btn.classList.add('active')
              })
            })
          })
        }
        addProductToBundle(){
          const cards = this.querySelectorAll('.card-bundle')
          cards.forEach((card) => {
            const btn = card.querySelector('.bundle-btn')
            btn.addEventListener('click',() => {
              const idProduct = btn.dataset.productId;
              if(card.classList.contains('active')){
                //card.classList.remove('active')
                const arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));
                const newArrayBundle = arrayBundle.filter((id) => id != idProduct )
                this.setAttribute('data-bundle-array', JSON.stringify(newArrayBundle))

              }else{
                //card.classList.add('active')
                let arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));

                if(arrayBundle.includes(idProduct))return;

                arrayBundle.push(idProduct)
                this.setAttribute('data-bundle-array', JSON.stringify(arrayBundle) )
              }
            })
          })
        }
        displayPopup(){
          const btnsLearnMore = this.querySelectorAll('.learn-more')
          const btnsClosePopup = this.querySelectorAll('.close-popup')
          const container = this.querySelector('.container-pb')
          btnsLearnMore.forEach((btn) => {
            btn.addEventListener('click',() => {
              console.log('btn', btn.dataset.productId )
              const cardPopup = container.querySelector(`.card-bundle[data-product-id="${ btn.dataset.productId }"]`) 
              container.classList.remove('popup-hidden')
              container.classList.add('popup-show')
              cardPopup.classList.remove('hidden-mobile')
              cardPopup.classList.add('show-mobile')

            })
          })

          btnsClosePopup.forEach((btn) => {
            btn.addEventListener('click',() => {
              console.log('click close popup')
              const cardPopup = container.querySelector(`.card-bundle[data-product-id="${ btn.dataset.productId }"]`) 
              container.classList.remove('popup-show')
              container.classList.add('popup-hidden')
              cardPopup.classList.remove('show-mobile')
              cardPopup.classList.add('hidden-mobile')
            })
          })
        }
        changeArrayBundle(oldValue, newValue){
          const arrayBundle = JSON.parse(newValue)
          const cards = this.querySelectorAll('.card-bundle')
          cards.forEach((card) => {
            if(arrayBundle.includes(card.dataset.productId)){
              card.classList.add('active')
            }else{
              card.classList.remove('active')
            }
          })
          const idBundle = this.getAttribute('data-bundle-id')
          const allSection = document.querySelectorAll(`[data-bundle-id="${ idBundle }"]`)
          allSection.forEach((section) => {
            const sectionBundle = section.getAttribute('data-bundle-array');
            if( newValue != sectionBundle){
              section.setAttribute('data-bundle-array', newValue)
            }
          })
        }

      }
      window.customElements.define('products-bundle', productsBundle );
    }
  });
}

const flatingBundleInit = ()=>{
  window.addEventListener("load", () => {
    if (!window.customElements.get('flating-bundle')) {
      class flatingBundle extends HTMLElement {

        static get observedAttributes() {
          return ['data-bundle-array'];
        }

        constructor() {
          super();
          this.discount = 0;
          this.totalPrice = 0;
        }

        connectedCallback() {
          this.deleteProduct();
          this.showBarresponsive();
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if(name == 'data-bundle-array'){
            this.changeArrayBundle(oldValue,newValue);
            this.updatePrice()
          }
        }
        deleteProduct(){
          const btnsClose = this.querySelectorAll('.close')
          btnsClose.forEach((btn) => {
            btn.addEventListener('click', () => {
              const idProduct = btn.dataset.productId
              const arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));
              const newArrayBundle = arrayBundle.filter((id) => id != idProduct )
              this.setAttribute('data-bundle-array', JSON.stringify(newArrayBundle))
            })
          })
        }
        showBarresponsive(){
          const btnShow = this.querySelector('.btn-mobile')
          const lockDiscount = this.querySelector('.lock-discount')
          const hBar = this.querySelector('.hbar')
          console.log(btnShow)
          btnShow.addEventListener('click', () => {
            btnShow.classList.add('show-responsive')
            lockDiscount.classList.remove('show-responsive')
            hBar.classList.remove('show-responsive')
          })
            
          lockDiscount.addEventListener('click', () => {
            btnShow.classList.remove('show-responsive')
            lockDiscount.classList.add('show-responsive')
            hBar.classList.add('show-responsive')
          })
        }
        changeArrayBundle(oldValue, newValue){
          const arrayBundle = JSON.parse(newValue);
          const arrayCubesDiscount = this.querySelectorAll('.cube-discount')
          arrayCubesDiscount.forEach((cubeDiscount) => {
            cubeDiscount.querySelector('.cont-text').classList.remove('hidden')
            const cubeProducts = cubeDiscount.querySelectorAll('.cube-discount-product');
            cubeProducts.forEach((product) => {
              if(!product.classList.contains('hidden')){
                product.classList.add('hidden')
              }
            })
          })
          arrayBundle.forEach((idProduct, index ) => {
            const cubeDiscount = arrayCubesDiscount[index]
            cubeDiscount.querySelector('.cont-text').classList.add('hidden')
            cubeDiscount.querySelector(`.cube-discount-product[data-product-id="${ idProduct }"]`).classList.remove('hidden')

          })

          const idBundle = this.getAttribute('data-bundle-id')
          const allSection = document.querySelectorAll(`[data-bundle-id="${ idBundle }"]`)
          allSection.forEach((section) => {
            const sectionBundle = section.getAttribute('data-bundle-array');
            if( newValue != sectionBundle){
              section.setAttribute('data-bundle-array', newValue)
            }
          })
          let price = 0
          if(arrayBundle.length > 0 ){
            const lastCube = arrayCubesDiscount[ arrayBundle.length - 1 ]
            this.discount = lastCube.getAttribute('data-discount-percentage')

            arrayBundle.forEach((idProduct) => {
              const product = lastCube.querySelector(`.cube-discount-product[data-product-id="${ idProduct }"]`)
              const productPrice = product.getAttribute('data-product-price')
              price += parseInt(productPrice)
            })
            this.totalPrice = price;

          }else{
            this.discount = 0;
            this.totalPrice = 0;
          }
        }
        updatePrice(){
          console.log('updatePrice')
          console.log('discount', this.discount )
          console.log('totalPrice', this.totalPrice )
          const price = (this.totalPrice / 100).toFixed(2);
          const discount = (this.totalPrice * this.discount ) / 100;
          const bundlePrice = (price - discount / 100).toFixed(2) ;

          const totalPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price);

          const totalBudle = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(bundlePrice);

          const elemFullPrice = this.querySelector('.full-price').innerHTML = totalPrice ;
          const elemBundlePrice = this.querySelector('.discount-price').innerHTML = totalBudle ;

        }
      }
      window.customElements.define('flating-bundle', flatingBundle );
    }
  });
}

const  closureBundleInit = ()=>{
  window.addEventListener("load", () => {
    if (!window.customElements.get('closure-bundle')) {
      class closureBundle extends HTMLElement {

        static get observedAttributes() {
          return ['data-bundle-array'];
        }

        constructor() {
          super();
        }

        connectedCallback() {
          this.addProductToBundle();
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if(name == 'data-bundle-array'){
            this.changeArrayBundle(oldValue,newValue);
          }
        }
        addProductToBundle(){
          const cards = this.querySelectorAll('.card-product')
          cards.forEach((card) => {
            const btn = card.querySelector('.btn-bundle')
            btn.addEventListener('click',() => {
              const idProduct = btn.dataset.productId;
              if(card.classList.contains('active')){
                //card.classList.remove('active')
                const arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));
                const newArrayBundle = arrayBundle.filter((id) => id != idProduct )
                this.setAttribute('data-bundle-array', JSON.stringify(newArrayBundle))

              }else{
                //card.classList.add('active')
                let arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));

                if(arrayBundle.includes(idProduct))return;

                arrayBundle.push(idProduct)
                this.setAttribute('data-bundle-array', JSON.stringify(arrayBundle) )
              }
            })
          })
          const tags = this.querySelectorAll('.mobile .info-closure')
          tags.forEach((tag) => {
            const btn = tag.querySelector('.btn-quit')
            btn.addEventListener('click', () => {
              const idProduct = tag.dataset.productId ;
              const arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));
              const newArrayBundle = arrayBundle.filter((id) => id != idProduct )
              this.setAttribute('data-bundle-array', JSON.stringify(newArrayBundle))
            })
          })
        }
        changeArrayBundle(oldValue, newValue){
          const arrayBundle = JSON.parse(newValue)
          const cards = this.querySelectorAll('.card-product')
          const checks = this.querySelectorAll('.info-closure')
          cards.forEach((card) => {
            if(arrayBundle.includes(card.dataset.productId)){
              card.classList.add('active')
            }else{
              card.classList.remove('active')
            }
          })
          checks.forEach((check) => {
            if(arrayBundle.includes(check.dataset.productId)){
              check.classList.add('active')
            }else{
              check.classList.remove('active')
            }
          })

          const idBundle = this.getAttribute('data-bundle-id')
          const allSection = document.querySelectorAll(`[data-bundle-id="${ idBundle }"]`)
          allSection.forEach((section) => {
            const sectionBundle = section.getAttribute('data-bundle-array');
            if( newValue != sectionBundle){
              section.setAttribute('data-bundle-array', newValue)
            }
          })
          
        }
      }
      window.customElements.define('closure-bundle', closureBundle );
    }
  });
}

getUserName()
closureBundleInit()
flatingBundleInit()
productsBundleInit()
dualTextImgInit();
dermFeatureInit();
resultsSliderInit();
regimenInit();
lifestyleInit();
