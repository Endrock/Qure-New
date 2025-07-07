document.addEventListener('ig:ready', function () {
  const hasBodyAttribute = document.body.hasAttribute('data-3m-select');
  const validPath = window.location.pathname.includes("/pages/qure-microinfusion-offer");

  if (hasBodyAttribute && validPath) {
    setTimeout(() => {
      const planBlocks = document.querySelectorAll(".step_conten_blocks .planBlock");
      
      if (planBlocks.length >= 2) {
        const secondPlanLabel = planBlocks[1].querySelector(".monthly_plans");
        if (secondPlanLabel) {
          const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          secondPlanLabel.dispatchEvent(clickEvent);
        }
      }
    }, 300);
  }
});

