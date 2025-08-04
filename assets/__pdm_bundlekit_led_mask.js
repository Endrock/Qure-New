/**
 * Bundle Kit LED Mask - Refactored Version
 * Simplified to handle only 2 products: Original and Bundle
 * Removed skincare kit functionality as requested
 */

// Global DOM elements cache to avoid repetitive queries
let domCache = {};

/**
 * Initializes and caches common DOM elements
 */
const initDOMCache = () => {
  domCache = {
    // Kit products (only original and bundle)
    originalProductInput: document.querySelector(".choose-your-kit-section__products .product-item.product-original input#productonly"),
    bundleProductInput: document.querySelector(".choose-your-kit-section__products .product-item.product-bundle input#productbundle"),
    
    // UI elements
    kitProducts: document.querySelectorAll(".choose-your-kit-section__products label.product-item"),
    kitProductsRadio: document.querySelectorAll(".choose-your-kit-section__products label.product-item input[name='product-kit']"),
    
    // Buttons and sticky elements
    buyNowButton: document.querySelector(".btn.buy_btn"),
    stickyButtonElement: document.querySelector(".button_sticky_wrapper"),
    stickyBuyButton: document.querySelector(".button_sticky_wrapper__button_sticky"),
    stickyTitle: document.querySelector(".button_sticky_wrapper__title"),
    stickyImage: document.querySelector(".button_sticky_wrapper__product-image")
  };
};

/**
 * Extracts product information from an input element
 * @param {HTMLElement} input - DOM input element
 * @param {string} prefix - Attribute prefix (e.g., 'product-original', 'product-bundle')
 * @returns {Object} Product information object
 */
const extractProductInfo = (input, prefix) => {
  if (!input) return null;
  
  return {
    title: input.getAttribute(`data-${prefix}-title`),
    image: input.getAttribute(`data-${prefix}-image`),
    handle: input.getAttribute(`data-${prefix}-handle`),
    variantId: input.getAttribute(`data-${prefix}-variant-id`)
  };
};

/**
 * Singleton for storing product information
 */
let productInfoCache = null;

/**
 * Initializes Bundle Kit LED Mask product information
 * Implements singleton pattern to avoid unnecessary recalculations
 * Now handles only original and bundle products
 * 
 * @returns {Object} Object with product information indexed by variantId
 */
const initBundleKitLedMask = () => {
  // Return cache if it already exists
  if (productInfoCache) {
    return { productinfo: productInfoCache };
  }

  console.log("Initializing Bundle Kit LED Mask...");
  
  // Ensure DOM cache is initialized
  if (!domCache.originalProductInput) {
    initDOMCache();
  }

  // Extract product information using helper function (only 2 products now)
  const originalProduct = extractProductInfo(domCache.originalProductInput, 'product-original');
  const bundleProduct = extractProductInfo(domCache.bundleProductInput, 'product-bundle');

  // Validate that we have the necessary information
  const products = [originalProduct, bundleProduct];
  if (products.some(product => !product || !product.variantId)) {
    console.error("Error: Missing required product information");
    return { productinfo: {} };
  }

  // Create product information object
  productInfoCache = {};
  
  [originalProduct, bundleProduct].forEach(product => {
    if (product && product.variantId) {
      productInfoCache[product.variantId] = product;
    }
  });

  console.log("Products ID:", productInfoCache);
  return { productinfo: productInfoCache };
};

/**
 * Updates button attributes with product information
 * @param {HTMLElement} button - Button element to update
 * @param {Object} productInfo - Product information object
 */
const updateButtonAttributes = (button, productInfo) => {
  if (!button || !productInfo) return;
  
  button.setAttribute("href", `/cart/add?id=${productInfo.variantId}&quantity=1`);
  button.setAttribute("onclick", `setEventProductHandler("${productInfo.handle}")`);
};

/**
 * Gets the variant ID from selected kit product
 * Simplified since we no longer have skincare variants
 * @param {HTMLElement} selectedKitProduct - Selected kit product element
 * @returns {string} Variant ID to use
 */
const getCorrectVariantId = (selectedKitProduct) => {
  const kitInput = selectedKitProduct?.querySelector('input[name="product-kit"]');
  
  if (!kitInput) {
    console.warn("Kit input not found");
    return null;
  }

  // Simply return the kit variant value (no skincare logic needed)
  const variantId = kitInput.value;
  console.log("Using kit variant:", variantId);
  
  return variantId;
};

/**
 * Updates main and sticky "Buy Now" buttons with product-specific information
 * @param {number|string} productSelected - Selected product ID
 */
const setInfoStickyBuyButton = (productSelected) => {
  const { productinfo } = initBundleKitLedMask();
  const selectedProduct = productinfo[productSelected];
  
  if (!selectedProduct) {
    console.error("Product not found:", productSelected);
    return;
  }

  console.log("Selected product info:", selectedProduct);

  // Update buttons
  updateButtonAttributes(domCache.buyNowButton, selectedProduct);
  updateButtonAttributes(domCache.stickyBuyButton, selectedProduct);

  // Update sticky information
  if (domCache.stickyTitle) {
    domCache.stickyTitle.textContent = selectedProduct.title;
  }
  
  if (domCache.stickyImage) {
    domCache.stickyImage.setAttribute("src", selectedProduct.image);
    domCache.stickyImage.setAttribute("srcset", selectedProduct.image);
  }
};

/**
 * Sets up event listeners for kit product changes
 * Simplified without skincare logic
 */
const changeStatusKitProduct = () => {
  if (!domCache.kitProductsRadio.length) {
    console.warn("No kit product radio buttons found");
    return;
  }

  console.log("Kit Products:", domCache.kitProducts);
  console.log("Kit Products Radio:", domCache.kitProductsRadio);

  domCache.kitProductsRadio.forEach((radio) => {
    radio.addEventListener("change", function () {
      console.log("Kit product changed:", this.value);
      
      // Remove previous selection
      domCache.kitProducts.forEach((product) => {
        product.closest(".product-item").classList.remove("selected");
      });
      
      // Add current selection
      const selectedProduct = this.closest(".product-item");
      if (selectedProduct) {
        selectedProduct.classList.add("selected");
        
        // Get variant ID and update buttons
        const correctVariantId = getCorrectVariantId(selectedProduct);
        
        if (correctVariantId) {
          setInfoStickyBuyButton(correctVariantId);
        } else {
          console.warn("Could not determine correct variant, using fallback");
          // Fallback to original value if correct variant cannot be determined
          setInfoStickyBuyButton(this.value);
        }
      }
    });
  });
};

/**
 * Initializes sticky buy button information with default bundle product values
 */
const initStickyBuyButtonInfo = () => {
  // Verify required elements
  const requiredElements = [
    domCache.stickyButtonElement,
    domCache.stickyBuyButton, 
    domCache.stickyTitle, 
    domCache.stickyImage
  ];
  
  if (requiredElements.some(el => !el)) {
    console.warn("Missing sticky button elements");
    return;
  }

  const bundleProduct = extractProductInfo(domCache.bundleProductInput, 'product-bundle');
  
  if (!bundleProduct) {
    console.error("Bundle product information not found");
    return;
  }

  // Update sticky information with default bundle product
  updateButtonAttributes(domCache.stickyBuyButton, bundleProduct);
  domCache.stickyTitle.textContent = bundleProduct.title;
  domCache.stickyImage.setAttribute("src", bundleProduct.image);
  domCache.stickyImage.setAttribute("srcset", bundleProduct.image);
};

/**
 * Main initialization function
 */
const init = () => {
  try {
    initDOMCache();
    initStickyBuyButtonInfo();
    initBundleKitLedMask();
    changeStatusKitProduct();
    
    console.log("Bundle Kit LED Mask initialized successfully");
  } catch (error) {
    console.error("Error initializing Bundle Kit LED Mask:", error);
  }
};

// Initialization event listener
document.addEventListener('DOMContentLoaded', init);