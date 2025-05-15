
/* NEW QR - LED Mask Neck & Dec Bundle Option AB test  */

/**
 * Initializes the bundle upsell functionality by adding event listeners to checkboxes
 * inside the given product bundle elements. Updates the "Buy Now" button's href and
 * onclick attributes based on the selected checkboxes.
 * 
 * @param {NodeList} pdmProductBundleElements - A NodeList containing all product bundle checkboxes.
 */
function initBundleUpsell(pdmProductBundleElements) {
  // Get the "Buy Now" button
  const buyNowButton = document.querySelector(".btn.buy_btn");
  if (!buyNowButton) return; 

  // Store default values for href and onclick attributes of the "Buy Now" button
  const defaultHref = buyNowButton.getAttribute("href");
  const defaultOnClick = buyNowButton.getAttribute("onclick");

  /**
   * Handles the checkbox change event by updating the "Buy Now" button's attributes
   * based on whether the checkbox is checked or not.
   */
  const handleCheckboxChange = function () {
    // Find the closest parent pdm-bundle-upsell container and get its product handle
    const pdmBundleContainer = this.closest(".pdm_product-bundle-container");
    const productHandle = pdmBundleContainer.getAttribute("data-product-bundle-handle");

    // Update the "Buy Now" button's href and onclick based on the checkbox state
    if (this.checked) {
      buyNowButton.setAttribute("href", `/cart/add?id=${this.value}&quantity=1`);
      buyNowButton.setAttribute("onclick", `setEventProductHandler("${productHandle}")`);
    } else {
      buyNowButton.setAttribute("href", defaultHref);
      buyNowButton.setAttribute("onclick", defaultOnClick);
    }
  };

  // Iterate through each checkbox and add an event listener for the "change" event
  pdmProductBundleElements.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  // Select all checkboxes inside product bundle containers
  const pdmProductBundleElements = document.querySelectorAll(".pdm_product-bundle-container input[type='checkbox']");

  // If checkboxes are found, initialize the upsell functionality
  if (pdmProductBundleElements.length > 0) {
    initBundleUpsell(pdmProductBundleElements);
  }
});

/* NEW QR - LED Mask Neck & Dec Bundle Option AB test  */