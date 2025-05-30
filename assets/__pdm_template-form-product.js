/**
 * Script: ab-free-patches-6-months
 *
 * Description:
 * Waits for the DOM to be fully loaded, then checks whether the
 * `data-ab-free-patches-6-months` attribute is present on the `<body>`.
 * If the attribute exists, it:
 *   1. Removes the original template element.
 *   2. Selects and checks the first radio input in the AB‐test plan block.
 *   3. Dispatches a 'change' event on that input so any listeners fire.
 * If the attribute does not exist, it removes the entire AB‐test block.
 *
 * Usage:
 * Place this script after the relevant HTML markup:
 *   <div class="template-original">…</div>
 *   <div class="step_conten_blocks ab-test">
 *     <div class="planBlock">
 *       <input type="radio" name="…" value="…" />
 *     </div>
 *   </div>
 *
 * Data Attributes:
 * - data-ab-free-patches-6-months (boolean): on `<body>`, toggles the test logic.
 */

 /**
  * Handler for the DOMContentLoaded event.
  * @returns {void}
  */
const onDomReady = () => {
  const isTestActive = document.body.hasAttribute('data-ab-free-patches-6-months');

  if (isTestActive) {
    /**
     * Remove the original template so the variant can display
     * @type {HTMLElement|null}
     */
    const originalTemplate = document.querySelector('.template-original');
    originalTemplate?.remove();

    /**
     * Find and select the first radio input in the AB‐test block,
     * then dispatch a 'change' event to trigger any bound listeners.
     * @type {HTMLInputElement|undefined}
     */
    const [firstRadioInput] = document.querySelectorAll(
      '.step_conten_blocks.ab-test .planBlock input[type="radio"]'
    );
    if (firstRadioInput) {
      firstRadioInput.checked = true;
      const changeEvent = new Event('change', { bubbles: true, cancelable: true });
      firstRadioInput.dispatchEvent(changeEvent);
    }
  } else {
    /**
     * Remove the entire AB‐test block when the test flag is absent
     * @type {HTMLElement|null}
     */
    const abTestBlock = document.querySelector('.step_conten_blocks.ab-test');
    abTestBlock?.remove();
  }
};

// Wait for the DOM to be fully parsed before running our test logic
document.addEventListener('DOMContentLoaded', onDomReady);