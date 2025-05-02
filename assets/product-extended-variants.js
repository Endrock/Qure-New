const product_extended_variants_reserve = () => {
    const clrOptionsInputs = document.querySelectorAll('.clr_options .form-check-input');
    const buyButton = document.querySelector('.btn-primary.buy_btn');

    clrOptionsInputs.forEach((input) => {
        input.addEventListener('click', (event) => {
            const variantId = event.target.value;
            if (buyButton) {
                buyButton.href = buyButton.href.replace(/id=\d+/, `id=${variantId}`);
            }
            product_extended_variants_replaceUrl(buyButton, variantId);
        });
    });
}

const product_extended_variants = () => {
    const clrOptionsInputs = document.querySelectorAll('.clr_options .form-check-input');
    const buyButton = document.querySelector('.without_subscription.buy_btn');
    const subscriptionForm = document.getElementById('SubscriptionForm');

    clrOptionsInputs.forEach(input => {
        input.addEventListener('click', function () {
            const variantId = input.value;

            if (subscriptionForm) {
                const variantIdInput = subscriptionForm.querySelector('input[name="id"]');

                if (variantIdInput) variantIdInput.value = variantId;
            }

            product_extended_variants_replaceUrl(buyButton, variantId);
        });
    });
};

const product_extended_variants_replaceUrl = (buyButton, variantId) => {
    if (buyButton) {
        const currentHref = new URL(buyButton.href);
        if (currentHref.searchParams.has('id')) {

            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('variant', variantId);
            history.replaceState(null, '', newUrl.toString());

            currentHref.searchParams.set('id', variantId);
            buyButton.href = currentHref.toString();
        }
    }
}

const product_extended_variants_setAsMain = function(variantId) {
    if (variantId) {
        const targetInput = document.querySelector(
          `.clr_options input[type="radio"][value="${variantId}"]`
        );
        if (targetInput) {
          targetInput.click();
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const variantId = urlParams.get("variant");
  
    if (variantId) {
      const targetInput = document.querySelector(
        `.clr_options input[type="radio"][value="${variantId}"]`
      );
      if (targetInput) {
        targetInput.click();
      }
    }
});