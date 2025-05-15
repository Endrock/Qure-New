function showElementsByAttribute() {
  if (document.body.hasAttribute('data-test-price-bundle')) {
    document.querySelector('.row.treatment-ba__row-container').remove();
  }

  if (!document.body.hasAttribute('data-test-price-bundle')) {
    document.querySelector('.row.price-bundle-test__row-container').remove();
  }
}

function selecElements() {
  const batchMessage = document.querySelector('.row.pdm-treatment__row-container .ctm_cls_next_batch_mi_lp');
  const radioButtons = document.querySelectorAll('input[name="monthlyPlan"]');
  batchMessage.style.display = 'none';

  radioButtons.forEach(function (radio) {
    radio.addEventListener('change', function () {
      if (document.getElementById('1_month').checked) {
        batchMessage.style.display = 'block';
      } else {
        batchMessage.style.display = 'none';
      }
    });
  });

  setTimeout(() => {
    const payInFullButton = document.querySelector('#pay_in_full');
    if (payInFullButton) {
      payInFullButton.checked = true;
      payInFullButton.dispatchEvent(new Event('change'));
    }
  }, 500);

  const radioInput = document.querySelector('.row.pdm-treatment__row-container .step_conten_blocks [data-tab="month_3"] input[type="radio"]');
  if (radioInput) {
    radioInput.checked = true;
    const changeEvent = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    radioInput.dispatchEvent(changeEvent);
  }
  const radioInputPayFull = document.querySelector(
    '.step_block .step_content.item-3.pdm-step_content_v2 input[type="radio"]'
  );
  if (radioInputPayFull) {
    radioInputPayFull.checked = true;
    const changeEvent = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    radioInputPayFull.dispatchEvent(changeEvent);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  showElementsByAttribute();
  selecElements();
});





