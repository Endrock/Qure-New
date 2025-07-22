// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {

  // Exit early if the body does not have the required attribute
  if (!document.body.hasAttribute('data-3m-select')) return;

  /**
   * Adds click event listeners to all `.monthly_plans` elements within `.planBlock`
   * inside each `.step_block`. When a `.monthly_plans` is clicked, it ensures that:
   * - All `.supply_fire` elements have the class `bg_linear_pink` added.
   * - The `.supply_fire` inside the clicked `.planBlock` has the class `bg_linear_pink` removed.
   */
  const newBackgroundColor = () => {
    const selectBlocks = document.querySelectorAll('.step_block');

    selectBlocks.forEach(block => {
      const planBlocks = block.querySelectorAll('.planBlock');

      planBlocks.forEach(planBlock => {
        const monthlyPlans = planBlock.querySelector('.monthly_plans');

        if (monthlyPlans) {
          monthlyPlans.addEventListener('click', function () {
            // Add `bg_linear_pink` to all `.supply_fire` elements
            document.querySelectorAll('.supply_fire').forEach(el => {
              el.classList.add('bg_linear_pink');
            });

            // Remove `bg_linear_pink` from the `.supply_fire` inside the clicked `.planBlock`
            const fire = planBlock.querySelector('.supply_fire');
            if (fire) {
              fire.classList.remove('bg_linear_pink');
            }
          });
        }
      });
    });
  };

  function autoSelectSecondMonthlyPlan() {
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

  // Init
  newBackgroundColor();
  autoSelectSecondMonthlyPlan();

  // Re-run background color logic if the `serumTypeSelected` event is triggered
  window.addEventListener('serumTypeSelected', () => {
    console.log('serumTypeSelected event triggered');
    newBackgroundColor();
    autoSelectSecondMonthlyPlan();
  });

});
