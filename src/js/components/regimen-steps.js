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



export default regimenInit;

