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

   function openPopUpPromotion(selector, overlay, popup) {
    if (selector && popup && overlay) { 
      selector.addEventListener("click", function () {
        // We capture the variantId of the clicked plan
        pdmSelectedVariantId = this.closest(".planBlockTop").dataset.variantid;
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
    const labelTwoMonth = document.querySelector('label[for="mBanner_1_month"]');
    const labelOneMonth = document.querySelector('label[for="1_month"]');
    const popup = document.getElementById("pdm-popup");
    const overlay = document.getElementById("pdm-popup-overlay");
    const decline = document.getElementById("pdm-decline");
    const submit  = document.querySelector('a.btn.buy_btn[href*="35987553419413"]');
    const closeBtn = document.getElementById("pdm-popup-close");
  
    // Show popup when 2 Month Supply or alternative option is clicked
    openPopUpPromotion(labelTwoMonth, overlay, popup);
    openPopUpPromotion(labelOneMonth, overlay, popup);
  
    // Close popup when clicking outside the popup (overlay)
    overlay?.addEventListener("click", function () {
      popup.classList.add("hidden");
      overlay.classList.add("hidden");
    });
  
    // Close popup when clicking "No thanks" button
    decline?.addEventListener("click", function () {
      if (pdmSelectedVariantId) {
        // We create the AJAX link to add to cart
        const ajaxLink = document.createElement("a");
        ajaxLink.href = `/cart/add?id=${pdmSelectedVariantId}&quantity=1`;
        ajaxLink.setAttribute("data-ajax-cart-request-button", "");
        ajaxLink.style.display = "none";
        document.body.appendChild(ajaxLink);
        
        // Fire petition
        ajaxLink.click();
        
        // Clean
        setTimeout(() => ajaxLink.remove(), 500);
      } else {
        console.warn("No variantId found to add to cart");
      }
      
      // Close popup
      popup.classList.add("hidden");
      overlay.classList.add("hidden");
    });

    // Close popup when clicking the "X" (close button)
    closeBtn?.addEventListener("click", function () {
      popup?.classList.add("hidden");
      overlay?.classList.add("hidden");
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