/* ========================
   START PDM - UPGRADE POPUP LOGIC - FACE SERUM
   ======================== */
   function openPopUpPromotion(selector, overlay, popup) {
    if (selector && popup && overlay) { 
      selector.addEventListener("click", function () {
        popup.classList.remove("hidden");
        overlay.classList.remove("hidden");
      });
    } else {
      console.warn("⚠️ No se encontró el label o el popup/overlay.");
    }
  }

   document.addEventListener("DOMContentLoaded", function () {
    const labelTwoMonth = document.querySelector('label[for="mBanner_1_month"]');
    const labelOneMonth = document.querySelector('label[for="1_month"]');
    const popup = document.getElementById("pdm-popup");
    const overlay = document.getElementById("pdm-popup-overlay");
    const decline = document.getElementById("pdm-decline");
    const submit  = document.querySelector('a.btn.buy_btn[href*="35987553419413"]');
    const closeBtn = document.getElementById("pdm-popup-close");
  
    // Mostrar popup cuando hacen click en 2 Month Supply
    openPopUpPromotion(labelTwoMonth, overlay, popup);
    openPopUpPromotion(labelOneMonth, overlay, popup);
  
    // Ocultar popup al hacer clic fuera
    overlay?.addEventListener("click", function () {
      popup.classList.add("hidden");
      overlay.classList.add("hidden");
    });
  
    // Ocultar popup al hacer clic en "No thanks"
    decline?.addEventListener("click", function () {
      popup.classList.add("hidden");
      overlay.classList.add("hidden");
    });

    // Cerrar popup al hacer clic en la "X"
    closeBtn?.addEventListener("click", function () {
      popup?.classList.add("hidden");
      overlay?.classList.add("hidden");
    });
    
    
  });
  
  function addUpgradeVariantToCart() {
    let variantSelected = document.querySelector('label[for="mBanner_2_month"]').closest(".planBlockTop");
    const variantId = variantSelected.dataset.variantid; // Variante del 4 Month Supply
  
    // Crear un <a> con los mismos atributos que usa Shopify
    const ajaxLink = document.createElement("a");
    ajaxLink.href = `/cart/add?id=${variantId}&quantity=1`;
    ajaxLink.setAttribute("data-ajax-cart-request-button", "");
    ajaxLink.style.display = "none"; 
    document.body.appendChild(ajaxLink);
  
    // Simular clic para que Shopify maneje el Ajax + cart drawer
    ajaxLink.click();
  
    // Cerrar el popup
    document.getElementById("pdm-popup")?.classList.add("hidden");
    document.getElementById("pdm-popup-overlay")?.classList.add("hidden");
  
    // Limpieza
    setTimeout(() => ajaxLink.remove(), 500);
  }
/* ========================
   END PDM - UPGRADE POPUP LOGIC - FACE SERUM
   ======================== */