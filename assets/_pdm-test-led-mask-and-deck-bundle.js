
/* NEW QR - LED Mask Neck & Dec Bundle Option AB test  */

/**
 * Initializes the bundle upsell functionality by adding event listeners to checkboxes
 * inside the given product bundle elements. Updates the "Buy Now" button's href and
 * onclick attributes based on the selected checkboxes.
 * 
 * @param {NodeList} pdmProductBundleElements - A NodeList containing all product bundle checkboxes.
 */
function initBundleUpsell(pdmProductBundleElements) {
  const buyNowButton = document.querySelector(".btn.buy_btn");
  const stickyBuyButton = document.querySelector(".button_sticky_wrapper__button_sticky");
  const stickyTitle = document.querySelector(".button_sticky_wrapper__title");
  const stickyImage = document.querySelector(".button_sticky_wrapper__product-image");

  if (!buyNowButton || !stickyBuyButton || !stickyTitle || !stickyImage) return;

  // Save default states
  const defaultHref = buyNowButton.getAttribute("href");
  const defaultOnClick = buyNowButton.getAttribute("onclick");

  const defaultStickyHref = stickyBuyButton.getAttribute("href");
  const defaultStickyOnClick = stickyBuyButton.getAttribute("onclick");
  const defaultStickyTitle = stickyTitle.textContent;
  const defaultStickyImageSrc = stickyImage.getAttribute("src");

  const handleCheckboxChange = function () {
    const pdmBundleContainer = this.closest(".pdm_product-bundle-container");

    const productHandle = pdmBundleContainer.getAttribute("data-product-bundle-handle");
    const variantId = pdmBundleContainer.getAttribute("data-product-bundle-variant-id");
    const bundleTitle = pdmBundleContainer.getAttribute("data-product-bundle-title");
    const bundleImage = pdmBundleContainer.getAttribute("data-product-bundle-image");

    console.log("Checkbox changed:", {
      defaultStickyImageSrc,
      bundleImage,
    });
    if (this.checked) {
      // Update Buy Now (main) button
      buyNowButton.setAttribute("href", `/cart/add?id=${this.value}&quantity=1`);
      buyNowButton.setAttribute("onclick", `setEventProductHandler("${productHandle}")`);

      // Update sticky button href + onclick
      stickyBuyButton.setAttribute("href", `/cart/add?id=${variantId}&quantity=1`);
      stickyBuyButton.setAttribute("onclick", `setEventProductHandler("${productHandle}")`);

      // Update sticky title
      if (bundleTitle) {
        stickyTitle.textContent = bundleTitle;
      }

      // Update sticky image
      if (bundleImage) {
        stickyImage.setAttribute("src", bundleImage);
        stickyImage.setAttribute("srcset", bundleImage);
      }
    } else {
      // Reset all to defaults
      buyNowButton.setAttribute("href", defaultHref);
      buyNowButton.setAttribute("onclick", defaultOnClick);

      stickyBuyButton.setAttribute("href", defaultStickyHref);
      stickyBuyButton.setAttribute("onclick", defaultStickyOnClick);

      stickyTitle.textContent = defaultStickyTitle;

      stickyImage.setAttribute("src", defaultStickyImageSrc);
      stickyImage.setAttribute("srcset", defaultStickyImageSrc);
    }
  };

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