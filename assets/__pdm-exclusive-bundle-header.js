class BundleFilter extends HTMLElement {
  constructor() {
    super();
    this.filterContainer = null;
    this.filterItems = [];
    this.targetElements = [];
  }

  connectedCallback() {
    this.init();
  }

  init() {
    this.filterContainer = this.querySelector('.bf_bundle_sale_ftr');
    
    if (!this.filterContainer) {
      console.warn('Bundle Filter: No se encontró el contenedor .bf_bundle_sale_ftr');
      return;
    }

    this.filterItems = this.filterContainer.querySelectorAll('a.bf_bundle_sale_ftr_item');
    
    if (this.filterItems.length === 0) {
      console.warn('Bundle Filter: No se encontraron elementos de filtro');
      return;
    }

    this.getTargetElements();
    this.attachEventListeners();
    this.ensureActiveState();
    this.updateTargetVisibility();
  }

  getTargetElements() {
    this.targetElements = [];
    
    this.filterItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1).toLowerCase();
        this.targetElements.push({
          hash: href,
          id: targetId,
          filterItem: item
        });

      }
    });
  }

  attachEventListeners() {
    this.filterItems.forEach(item => {
      item.addEventListener('click', (e) => this.handleClick(e, item));
    });
  }

  handleClick(event, clickedItem) {
    event.preventDefault();
    event.stopPropagation();
    this.filterItems.forEach(item => {
      item.classList.remove('active');
    });

    clickedItem.classList.add('active');
    this.updateTargetVisibility();

    this.dispatchEvent(new CustomEvent('bundle-filter-changed', {
      detail: {
        selectedFilter: clickedItem,
        href: clickedItem.getAttribute('href'),
        text: clickedItem.textContent.trim(),
        targetElement: this.getActiveTargetElement()
      },
      bubbles: true
    }));
  }

  updateTargetVisibility() {
    const activeItem = this.getActiveFilter();
    if (!activeItem) return;

    const activeHref = activeItem.getAttribute('href');

    this.targetElements.forEach(target => {
      const targetElement = document.getElementById(target.id);
      if (targetElement) targetElement.style.display = 'none';
    });

    const activeTarget = this.targetElements.find(target => target.hash === activeHref);
    if (activeTarget) {
      const targetElement = document.getElementById(activeTarget.id);
      if (targetElement) targetElement.style.display = '';
    }
  }

  ensureActiveState() {
    const activeItem = this.filterContainer.querySelector('a.bf_bundle_sale_ftr_item.active');
    
    if (!activeItem && this.filterItems.length > 0) {
      this.filterItems[0].classList.add('active');
    }
  }

  getActiveTargetElement() {
    const activeItem = this.getActiveFilter();
    if (!activeItem) return null;

    const activeHref = activeItem.getAttribute('href');
    const activeTarget = this.targetElements.find(target => target.hash === activeHref);
    if (!activeTarget) return null;
    const activeTargetElement = document.getElementById(activeTarget.id);
    return activeTargetElement;
  }

  getActiveFilter() {
    return this.filterContainer.querySelector('a.bf_bundle_sale_ftr_item.active');
  }

}

customElements.define('bundle-filter', BundleFilter);

document.addEventListener('DOMContentLoaded', () => {
  const existingContainers = document.querySelectorAll('.bf_bundle_sale:not(bundle-filter *)');
  
  existingContainers.forEach(container => {
    const filterContainer = container.querySelector('.bf_bundle_sale_ftr');
    if (filterContainer) {
      const tempFilter = new BundleFilter();
      tempFilter.filterContainer = filterContainer;
      tempFilter.filterItems = filterContainer.querySelectorAll('a.bf_bundle_sale_ftr_item');
      tempFilter.getTargetElements();
      tempFilter.attachEventListeners();
      tempFilter.ensureActiveState();
      tempFilter.updateTargetVisibility();
    }
  });
});