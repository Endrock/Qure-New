// __pdm-timeline-progress.js

// Register the custom element only if it hasn't been defined already
if (!customElements.get('pdm-timeline-progress')) {

  // Define the custom element class
  class PDMTimelineProgress extends HTMLElement {
    constructor() {
      super();
      this.current = 0; // Tracks the currently active card index
      this.handleClick = this.handleClick.bind(this); // Bind the click handler to the instance
    }

    // Called when the element is added to the DOM
    connectedCallback() {
      this.init();
    }

    // Initializes references and sets up the component
    init() {
      this.navWrapper = this.querySelector('.timeline-progress-nav-wrapper'); // Scrollable nav container
      this.navItems = this.querySelectorAll('.timeline-nav-item'); // Step navigation items
      this.cards = this.querySelectorAll('.timeline-card'); // All timeline content cards
      this.dots = this.querySelectorAll('.timeline-dot'); // Mobile dots
      this.prevBtn = this.querySelector('[data-direction="prev"]'); // Previous button
      this.nextBtn = this.querySelector('[data-direction="next"]'); // Next button
      this.progressBar = this.querySelector('.timeline-progress-bar'); // Progress bar indicator

      // Initialize progress bar width
      this.progressBar.style.width = '0%';

      // Attach click listener to the component
      this.addEventListener('click', this.handleClick);

      // Set initial UI state
      this.updateCards();

      // Delay progress bar update slightly to ensure layout is ready
      setTimeout(() => this.updateProgressBar(), 50);
    }

    /**
     * Handles click events inside the component.
     * Determines whether a navigation item, dot, or control button was clicked.
     */
    handleClick(event) {
      // Helper to get index from clicked element with given selector
      const getIndex = (selector) => {
        const element = event.target.closest(selector);
        if (!element) return null;
        const index = parseInt(element.dataset.index, 10);
        return isNaN(index) ? null : index;
      };

      // Handle nav item click
      const navIndex = getIndex('.timeline-nav-item');
      if (navIndex !== null) {
        this.setCurrentCard(navIndex);
        return;
      }

      // Handle dot click (mobile)
      const dotIndex = getIndex('.timeline-dot');
      if (dotIndex !== null) {
        this.setCurrentCard(dotIndex);
        return;
      }

      // Handle previous/next button clicks
      if (event.target.closest('[data-direction="prev"]')) {
        this.showPrevCard();
      } else if (event.target.closest('[data-direction="next"]')) {
        this.showNextCard();
      }
    }

    /**
     * Sets the current card to a specific index.
     * Updates UI and scrolls to the corresponding nav item.
     */
    setCurrentCard(index) {
      if (index >= 0 && index < this.cards.length) {
        this.current = index;
        this.updateCards();
        this.updateProgressBar();
        this.scrollToCurrentItem();
      }
    }

    // Navigate to previous card (if not at the beginning)
    showPrevCard() {
      if (this.current > 0) {
        this.current--;
        this.updateCards();
        this.updateProgressBar();
        this.scrollToCurrentItem();
      }
    }

    // Navigate to next card (if not at the end)
    showNextCard() {
      if (this.current < this.cards.length - 1) {
        this.current++;
        this.updateCards();
        this.updateProgressBar();
        this.scrollToCurrentItem();
      }
    }

    /**
     * Updates the visual width of the progress bar based on current index.
     */
    updateProgressBar() {
      if (!this.progressBar || this.cards.length === 0) return;

      let progressPercentage = 0;
      if (this.cards.length === 1) {
        progressPercentage = 100;
      } else {
        progressPercentage = (this.current / (this.cards.length - 1)) * 100;
      }

      this.progressBar.style.width = `${progressPercentage}%`;
    }

    /**
     * Utility method to detect if the screen is in mobile view.
     */
    isMobile() {
      return window.innerWidth <= 1024;
    }

    /**
     * Scrolls the nav wrapper to keep the current nav item in view (for mobile).
     */
    scrollToCurrentItem() {
      if (!this.isMobile() || !this.navWrapper || !this.navItems[this.current]) return;

      const currentItem = this.navItems[this.current];
      const scrollLeft = currentItem.offsetLeft - 20;

      this.navWrapper.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth'
      });
    }

    /**
     * Updates the "active" class on nav items, cards, and dots.
     * Also disables/enables prev/next buttons based on the current index.
     */
    updateCards() {
      // Internal helper to toggle active class
      const updateActive = (elements) => {
        elements.forEach((el, i) => {
          el.classList.toggle('active', i === this.current);
        });
      };

      updateActive(this.navItems);
      updateActive(this.cards);
      updateActive(this.dots);

      if (this.prevBtn) {
        this.prevBtn.disabled = this.current === 0;
      }

      if (this.nextBtn) {
        this.nextBtn.disabled = this.current === this.cards.length - 1;
      }
    }
  }

  // Register the custom element in the browser
  customElements.define('pdm-timeline-progress', PDMTimelineProgress);
}
