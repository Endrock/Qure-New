if (!customElements.get('pdm-timeline-progress')) {
  class PDMTimelineProgress extends HTMLElement {
    constructor() {
      super();
      this.current = 0;
    }

    connectedCallback() {
      this.init();
    }

    init() {
      this.cards = this.querySelectorAll('.timeline-card');
      this.prevBtn = this.querySelector('#timeline-prev');
      this.nextBtn = this.querySelector('#timeline-next');
      this.navItems = this.querySelectorAll('.timeline-nav-item');
      this.navWrapper = this.querySelector('.timeline-progress-nav-wrapper');

      if (this.prevBtn && this.nextBtn) {
        this.prevBtn.addEventListener('click', () => this.showPrevCard());
        this.nextBtn.addEventListener('click', () => this.showNextCard());
      }

      if (this.navItems.length) {
        this.navItems.forEach(item => {
          item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index, 10);
            if (!isNaN(index)) {
              this.current = index;
              this.updateCards();
              this.scrollToCurrentItem();
            }
          });
        });
      }

      this.updateCards();
    }

    isMobile() {
      return window.innerWidth <= 1024;
    }

    scrollToCurrentItem() {
      if (!this.isMobile() || !this.navWrapper || !this.navItems[this.current]) {
        return;
      }

      const currentNavItem = this.navItems[this.current];
      
      // Opción 1: Completamente al borde izquierdo
      // const scrollLeft = currentNavItem.offsetLeft;
      
      // Opción 2: Con un pequeño margen del borde izquierdo (recomendado)
      const scrollLeft = currentNavItem.offsetLeft - 20;
      
      // Opción 3: Al 25% del viewport desde la izquierda
      // const scrollLeft = currentNavItem.offsetLeft - (this.navWrapper.offsetWidth * 0.25);

      this.navWrapper.scrollTo({
        left: Math.max(0, scrollLeft), // Evita scroll negativo
        behavior: 'smooth'
      });
    }


    updateCards() {
      this.cards.forEach((card, index) => {
        card.classList.toggle('active', index === this.current);
      });

      this.navItems.forEach((item, index) => {
        item.classList.toggle('active', index === this.current);
      });

      if (this.prevBtn && this.nextBtn) {
        this.prevBtn.disabled = this.current === 0;
        this.nextBtn.disabled = this.current === this.cards.length - 1;
      }
    }

    showPrevCard() {
      if (this.current > 0) {
        this.current--;
        this.updateCards();
        this.scrollToCurrentItem();
      }
    }

    showNextCard() {
      if (this.current < this.cards.length - 1) {
        this.current++;
        this.updateCards();
        this.scrollToCurrentItem();
      }
    }
  }

  customElements.define('pdm-timeline-progress', PDMTimelineProgress);
}
