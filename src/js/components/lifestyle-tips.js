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

export default lifestyleInit ;
