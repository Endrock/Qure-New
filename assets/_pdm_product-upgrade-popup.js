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
    let  buttonOffers;
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
        pdmSelectedVariantId = variant.closest(parentClass).dataset.variantid;
        // Show pop up
        popup.classList.remove("hidden");
        overlay.classList.remove("hidden");
      });
    } else {
      console.warn("Label or popup/overlay not found");
    }
  }

  function clickSelectors(selectorsVariant, popupBtn, buyNowBtn, nameInput) {
    selectorsVariant.forEach(selector => {
      selector.addEventListener("click", function () {
        if (selector.id == nameInput) {
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
    const variantId = variantSelected.dataset.variantid; // Variante del 4 Month Supply
  
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

  function validPopupUpgrade() {
    const hasBodyAttribute = document.body.hasAttribute('data-popup-test');

    if (!hasBodyAttribute) return false;

     labelTwoMonth = document.querySelector('label[for="mBanner_1_month"]');
     labelOneMonth = document.querySelector('label[for="1_month"]');
     popup = document.getElementById("pdm-popup");
     overlay = document.getElementById("pdm-popup-overlay");
     decline = document.getElementById("pdm-decline");
     closeBtn = document.getElementById("pdm-popup-close");
     buyNowOne = document.querySelector('.submit_btn_top');
     buyNowTwo = document.querySelector('.submit_btn_down');
     buttonOffers = document.querySelectorAll('.pdm-popup-btn');
     variantsOne = document.querySelectorAll('input[name="mBanner_monthlyPlan"]');
     variantsTwo = document.querySelectorAll('input[name="monthlyPlan"]');

     buttonOfferOne = document.querySelector('.pdm-popup-btn-form');
     buttonOfferTwo = document.querySelector('.pdm-popup-btn-image-form');  

    if (!labelTwoMonth || 
        !labelOneMonth || 
        !popup || 
        !overlay || 
        !decline || 
        !closeBtn || 
        !buyNowOne || 
        !buyNowTwo || 
        !variantsOne || 
        !variantsTwo || 
        !buttonOfferOne || 
        !buttonOfferTwo) {
            return false;
    }
    return true
  }

  function initPopupUpgrade () {
    if (validPopupUpgrade ()) {
    clickSelectors(variantsOne, buttonOfferOne, buyNowOne, 'mBanner_1_month')
    clickSelectors(variantsTwo, buttonOfferTwo, buyNowTwo, '1_month')

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
  }

  document.addEventListener('DOMContentLoaded', initPopupUpgrade)
/**
 * ============================================
 * END - PDM UPGRADE POPUP LOGIC - FACE SERUM
 * ============================================
 */