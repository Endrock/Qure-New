/**
 * ============================================
 * START - PDM UPGRADE POPUP LOGIC - FACE SERUM
 * ============================================
 */
/**
 * Opens the upgrade popup when a specific plan label is clicked.
 *
 * @param {HTMLElement} selector - The label element that triggers the popup.
 * @param {HTMLElement} overlay - The popup overlay element.
 * @param {HTMLElement} popup - The popup container element.
 */

    let pdmSelectedVariantId = null;
    let  labelTwoMonth;
    let  labelOneMonth;
    let  popup;
    let  overlay;
    let  decline;
    let  closeBtn;
    let  buyNowOne;
    let  buyNowTwo;
    let  variantsOne;
    let  variantsTwo;
    let  buttonOfferOne;
    let  buttonOfferTwo;

/**
 * Add the saved variant to the cart and close the popup.
 */
function handleDeclineOrClose(popup, overlay) {
  if (pdmSelectedVariantId) {
    const ajaxLink = document.createElement("a");
    ajaxLink.href = `/cart/add?id=${pdmSelectedVariantId}&quantity=1`;
    ajaxLink.setAttribute("data-ajax-cart-request-button", "");
    ajaxLink.style.display = "none";
    document.body.appendChild(ajaxLink);
    ajaxLink.click();
    setTimeout(() => ajaxLink.remove(), 500);
  } else {
    console.warn("No variantId found to add to cart");
  }
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
}

   function openPopUpPromotion(variant, selector, overlay, popup, parentClass) {  
    if (variant && popup && overlay) { 
      selector.addEventListener("click", function () {
        // We capture the variantId of the clicked plan
        const variantElement = variant.closest(parentClass)
        if (!variantElement) return;
        pdmSelectedVariantId = variantElement.dataset.variantid || variantElement.getAttribute('data-product_variant_id');
        
        // Show pop up
        popup.classList.remove("hidden");
        overlay.classList.remove("hidden");
      });
    } else {
      console.warn("Label or popup/overlay not found");
    }
  }

  function clickSelectors(selectorsVariant, popupBtn, buyNowBtn) {
    selectorsVariant.forEach(selector => {
      selector.addEventListener("click", function () {
        if (selector == selectorsVariant[selectorsVariant.length - 1]) {
          popupBtn.classList.remove('hidden');
          buyNowBtn.classList.add('hidden');
        }else {
          popupBtn.classList.add('hidden');
          buyNowBtn.classList.remove('hidden');
          
        }
      });
  });
  }


  /**
  * Adds the 4 Month Supply variant to the cart via Ajax and closes the popup.
  */
  function addUpgradeVariantToCart() {
    let variantSelected = document.querySelector('label[for="mBanner_2_month"]').closest(".planBlockTop");
    if (!variantSelected) return;
    const variantId = variantSelected.dataset.variantid || variantSelected.getAttribute('data-product_variant_id');
  
    // Create an <a> element that simulates an Ajax cart add
    const ajaxLink = document.createElement("a");
    ajaxLink.href = `/cart/add?id=${variantId}&quantity=1`;
    ajaxLink.setAttribute("data-ajax-cart-request-button", "");
    ajaxLink.style.display = "none"; 
    document.body.appendChild(ajaxLink);
  
    // Trigger the click event to open the cart drawer
    ajaxLink.click();
  
    // Close the popup after adding to cart
    document.getElementById("pdm-popup")?.classList.add("hidden");
    document.getElementById("pdm-popup-overlay")?.classList.add("hidden");
  
    // Cleanup
    setTimeout(() => ajaxLink.remove(), 500);
  }

  
    const hasBodyAttribute = document.body.hasAttribute('data-popup-test');

    labelTwoMonth = document.querySelector('label[for="mBanner_1_month"]');
     popup = document.getElementById("pdm-popup");
     overlay = document.getElementById("pdm-popup-overlay");
     decline = document.getElementById("pdm-decline");
     closeBtn = document.getElementById("pdm-popup-close");

  function initPopupUpgrade () {
    let monthlyPlanElements = document.querySelectorAll('label.pdm-popup-months')
    labelOneMonth = monthlyPlanElements[monthlyPlanElements.length - 1]
    buyNowOne = document.querySelector('.submit_btn_top');
    buyNowTwo = document.querySelector('.submit_btn_down');
    buttonOfferOne = document.querySelector('.pdm-popup-btn-form');
    buttonOfferTwo = document.querySelector('.pdm-popup-btn-image-form');
    let monthlyVariantsOne = document.querySelectorAll('.planBlockTop label');
    let monthlyVariantsTwo = document.querySelectorAll('.planBlockDown label');
    clickSelectors(monthlyVariantsOne, buttonOfferOne, buyNowOne)
    clickSelectors(monthlyVariantsTwo, buttonOfferTwo, buyNowTwo)

    // Show popup when 2 Month Supply or alternative option is clicked
    openPopUpPromotion(labelTwoMonth, buttonOfferOne, overlay, popup, ".planBlockTop");
    openPopUpPromotion(labelOneMonth, buttonOfferTwo, overlay, popup, ".planBlockDown");
    
  
    // Close popup when clicking outside the popup (overlay)
    overlay?.addEventListener("click", function () {
      handleDeclineOrClose(popup, overlay);
    });
  
    // Close popup when clicking "No thanks" button
    decline?.addEventListener("click", function () {
      handleDeclineOrClose(popup, overlay);
    });

    // Close popup when clicking the "X" (close button)
    closeBtn?.addEventListener("click", function () {
      handleDeclineOrClose(popup, overlay);
    });
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => {
      initPopupUpgrade();
    }, 1000);
  });
/**
 * ============================================
 * END - PDM UPGRADE POPUP LOGIC - FACE SERUM
 * ============================================
 */