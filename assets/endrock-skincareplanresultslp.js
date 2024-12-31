console.log('Carlos skincareplanresultslp')

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
              console.log('click', tab.getAttribute('index') );
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

regimenInit();
lifestyleInit();
