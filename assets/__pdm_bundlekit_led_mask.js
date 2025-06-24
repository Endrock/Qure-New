// Global DOM elements cache to avoid repetitive queries
let domCache = {};

/**
 * Initializes and caches common DOM elements
 */
const initDOMCache = () => {
  domCache = {
    // Kit products
    originalProductInput: document.querySelector(".choose-your-kit-section__products .product-item.product-original input#productonly"),
    bundleProductInput: document.querySelector(".choose-your-kit-section__products .product-item.product-bundle input#productbundle"),
    
    // Skincare products
    skincareKitInput1: document.querySelector(".choose-your-skincarekit-section__product .skincare-bundle input[name='original_productskincare']"),
    skincareKitInput2: document.querySelector(".choose-your-skincarekit-section__product .skincare-bundle input[name='bundle_productskincare']"),
    
    // UI elements
    kitProducts: document.querySelectorAll(".choose-your-kit-section__products label.product-item"),
    kitProductsRadio: document.querySelectorAll(".choose-your-kit-section__products label.product-item input[name='product-kit']"),
    
    // Buttons and sticky elements
    buyNowButton: document.querySelector(".btn.buy_btn"),
    stickyButtonElement: document.querySelector(".button_sticky_wrapper"),
    stickyBuyButton: document.querySelector(".button_sticky_wrapper__button_sticky"),
    stickyTitle: document.querySelector(".button_sticky_wrapper__title"),
    stickyImage: document.querySelector(".button_sticky_wrapper__product-image"),
    
    // Skincare elements
    skincarekitProducts: document.querySelectorAll('.skincarekit-products'),
    skincarekitProductsRadio: document.querySelector('.skincare-bundle-container input[name="productskincare"]')
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

  // Extract product information using helper function
  const originalProduct = extractProductInfo(domCache.originalProductInput, 'product-original');
  const bundleProduct = extractProductInfo(domCache.bundleProductInput, 'product-bundle');
  const skincareProduct1 = extractProductInfo(domCache.skincareKitInput1, 'productskincare');
  const skincareProduct2 = extractProductInfo(domCache.skincareKitInput2, 'productskincare');

  // Validate that we have the necessary information
  const products = [originalProduct, bundleProduct, skincareProduct1, skincareProduct2];
  if (products.some(product => !product || !product.variantId)) {
    console.error("Error: Missing required product information");
    return { productinfo: {} };
  }

  // Create product information object
  productInfoCache = {};
  
  [originalProduct, bundleProduct, skincareProduct1, skincareProduct2].forEach(product => {
    if (product && product.variantId) {
      productInfoCache[product.variantId] = product;
    }
  });

  console.log("Products ID:", productInfoCache);
  return { productinfo: productInfoCache };
};

/**
 * Actualiza atributos de un botón con información del producto
 * @param {HTMLElement} button - Elemento botón a actualizar
 * @param {Object} productInfo - Información del producto
 */
const updateButtonAttributes = (button, productInfo) => {
  if (!button || !productInfo) return;
  
  button.setAttribute("href", `/cart/add?id=${productInfo.variantId}&quantity=1`);
  button.setAttribute("onclick", `setEventProductHandler("${productInfo.handle}")`);
};

/**
 * Determina qué variante usar basándose en el estado del checkbox de skincare
 * y actualiza automáticamente la información de los botones sticky
 * @param {HTMLElement} selectedKitProduct - Elemento del producto kit seleccionado
 * @param {boolean} updateButtons - Si debe actualizar los botones automáticamente (default: true)
 * @returns {string} ID de la variante a usar
 */
const getCorrectVariantId = (selectedKitProduct, updateButtons = true) => {
  const isSkincareChecked = domCache.skincarekitProductsRadio?.checked;
  const kitInput = selectedKitProduct?.querySelector('input[name="product-kit"]');
  
  if (!kitInput) {
    console.warn("Kit input not found");
    return null;
  }

  let variantId;
  
  if (isSkincareChecked) {
    // Si skincare está marcado, usar la variante de skincare
    variantId = kitInput.getAttribute('data-productskincare-variant-id');
    console.log("Using skincare variant:", variantId);
  } else {
    // Si skincare no está marcado, usar la variante normal del kit
    variantId = kitInput.value;
    console.log("Using kit variant:", variantId);
  }

  // Actualizar botones automáticamente si se solicita
  if (updateButtons && variantId) {
    setInfoStickyBuyButton(variantId);
  }

  return variantId;
};

/**
 * Actualiza la información de los botones "Buy Now" principal y sticky
 * @param {number|string} productSelected - ID del producto seleccionado
 */
const setInfoStickyBuyButton = (productSelected) => {
  const { productinfo } = initBundleKitLedMask();
  const selectedProduct = productinfo[productSelected];
  
  if (!selectedProduct) {
    console.error("Product not found:", productSelected);
    return;
  }

  console.log("Selected product info:", selectedProduct);

  // Actualizar botones
  updateButtonAttributes(domCache.buyNowButton, selectedProduct);
  updateButtonAttributes(domCache.stickyBuyButton, selectedProduct);

  // Actualizar información sticky
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
        
        // Determine correct variant and update buttons automatically
        const correctVariantId = getCorrectVariantId(selectedProduct);
        
        if (!correctVariantId) {
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
 * Handles changes in skincare product selection
 */
const skincareKitProductTrigger = () => {
  if (!domCache.skincarekitProductsRadio) {
    console.warn("Skincare kit radio button not found");
    return;
  }

  domCache.skincarekitProductsRadio.addEventListener('change', function () {
    const productKitSelected = document.querySelector('.choose-your-kit-section__products .product-item.selected');
    
    if (!productKitSelected) {
      console.warn("No kit product selected");
      return;
    }

    // Use centralized function that automatically updates buttons
    const correctVariantId = getCorrectVariantId(productKitSelected);
    
    if (!correctVariantId) {
      console.error("Could not determine correct variant ID");
    } else {
      console.log(`Skincare ${this.checked ? 'checked' : 'unchecked'} - Using variant:`, correctVariantId);
    }
  });
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
    skincareKitProductTrigger();
    
    console.log("Bundle Kit LED Mask initialized successfully");
  } catch (error) {
    console.error("Error initializing Bundle Kit LED Mask:", error);
  }
};

// Initialization event listener
document.addEventListener('DOMContentLoaded', init);