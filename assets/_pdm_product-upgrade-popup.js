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

  /**
 * Waits for the DOM to be fully loaded before initializing popup event listeners.
 * 
 * Sets up click handlers to open and close the upgrade popup
 * when interacting with plan labels, the overlay, decline button, or close button.
 */
   
  document.addEventListener("DOMContentLoaded", function () {
    const hasBodyAtribute = document.body.hasAttribute('data-popup-test');

    if (!hasBodyAtribute) return;
    
    
    const labelTwoMonth = document.querySelector('label[for="mBanner_1_month"]');
    const labelOneMonth = document.querySelector('label[for="1_month"]');
    const popup = document.getElementById("pdm-popup");
    const overlay = document.getElementById("pdm-popup-overlay");
    const decline = document.getElementById("pdm-decline");
    const closeBtn = document.getElementById("pdm-popup-close");
    const buyNowOne = document.querySelector('.submit_btn_top');
    const buyNowTwo = document.querySelector('.submit_btn_down');
    const ButtonOffers = document.querySelectorAll('.pdm-popup-btn');
    const variantsOne = document.querySelectorAll('input[name="mBanner_monthlyPlan"]');
    const variantsTwo = document.querySelectorAll('input[name="monthlyPlan"]');

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

    clickSelectors(variantsOne, ButtonOffers[0], buyNowOne, 'mBanner_1_month')
    clickSelectors(variantsTwo, ButtonOffers[1], buyNowTwo, '1_month')

    // Show popup when 2 Month Supply or alternative option is clicked
    openPopUpPromotion(labelTwoMonth, ButtonOffers[0], overlay, popup, ".planBlockTop");
    openPopUpPromotion(labelOneMonth, ButtonOffers[1], overlay, popup, ".planBlockDown");
  
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
  });

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
/**
 * ============================================
 * END - PDM UPGRADE POPUP LOGIC - FACE SERUM
 * ============================================
 */