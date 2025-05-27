/**
 * Web Component: <pdm-stock-items-left>
 *
 * Description:
 * Custom element that dynamically displays the number of kits left in stock
 * for a given product. It fetches stock data from an external API
 * using the product ID passed via a data attribute and updates the DOM accordingly.
 *
 * Usage:
 * <pdm-stock-items-left data-product-id="123456">
 *   <strong class="pdm_price-stock-left-quantity"></strong> left
 * </pdm-stock-items-left>
 *
 * Expected HTML structure inside the element:
 * - A child element with the class `.pdm_price-stock-left-quantity`
 *   where the stock message will be injected.
 *
 * Data Attributes:
 * - data-product-id (string): The product ID used to fetch stock data from the API.
 *
 * API Endpoint:
 * - https://webhooks.endrock.software/endrockapi/qureskincare/stock/:productId
 *   (Returns a JSON response containing a `data` property with the stock count.)
 */

class PDMStockItemsLeft extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * Lifecycle hook called when the element is added to the DOM.
   * Triggers the stock-fetching logic.
   */
  connectedCallback() {
    this.init();
  }

  /**
   * Initializes the component by validating required attributes and
   * updating the stock message if the data is available.
   */
  async init() {
    const productId = this.dataset.productId;
    const stockTextElement = this.querySelector('.pdm_price-stock-left-quantity');

    if (!productId || !stockTextElement) {
      console.warn('Missing productId or target element for stock display');
      return;
    }

    const url = `https://webhooks.endrock.software/endrockapi/qureskincare/stock/${productId}`;
    await this.updateValueStock(stockTextElement, url);
  }

  /**
   * Fetches stock data from the given API URL.
   * @param {string} url - The API endpoint to fetch data from.
   * @returns {Promise<Object|null>} - Parsed JSON response or null if failed.
   */
  async getDataStock(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching stock data:", error);
      return null;
    }
  }

  /**
   * Updates the target DOM element with the stock count message.
   * @param {HTMLElement} element - The DOM element to display stock quantity.
   * @param {string} url - The API endpoint used to fetch stock data.
   */
  async updateValueStock(element, url) {
    const dataStock = await this.getDataStock(url);
    if (dataStock?.data) {
      const message = `${dataStock.data} kits `;
      element.textContent = message;
    } else {
      element.textContent = '0 kits';
    }
  }
}

// Define the custom element
customElements.define('pdm-stock-items-left', PDMStockItemsLeft);