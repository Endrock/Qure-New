/**
 * Retrieves the user's location IP and calls the deliveryDate function with the result.
 */
const userLocationIP = () => {
  const url = 'https://us-central1-functions-358315.cloudfunctions.net/location';
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('result', result);
      return deliveryDate(result);
    })
    .catch(error => console.log('error', error));
}


/**
 * Retrieves the delivery range for a given state.
 * @param {string} stateAcronym - The acronym of the state.
 * @returns {number|null} - The delivery range for the state, or null if not found.
 */
function getDeliveryRange(stateAcronym) {
  console.log(stateAcronym);
  const stateFound = window.statesInfo.find(
    (state) => state.stateAcronym === stateAcronym
  );

  return stateFound ? stateFound.deliveryRange : null;
}


/**
 * Calculates and displays the delivery date based on the location.
 * @param {Object} location - The location object containing the countryCode and region.
 */
const deliveryDate = (location) => {
  const { countryCode, region } = location;

  const messageContainer = document.querySelector('.orderby-receiveby__shipping-text');
  const nationalMessage = window.nationalText.split('[]');

  if (countryCode != 'US') {
    messageContainer.innerText = window.internationalText
  } else {

    const foundNationalDate = getDeliveryRange(region.toUpperCase());
    messageContainer.innerText = `${nationalMessage[0]} ${foundNationalDate} ${nationalMessage[1]}`
  }
  document.querySelector('.orderby-receiveby').classList.remove('hidden');
}

// swiper PDP: Before & After First Image 

const swiperInfoResutl = new Swiper('.swiper-info-result', {

});

// end swiper PDP: Before & After First Image

const swiperBeforeAfter = (selector) => {
  const swiperInstance = new Swiper(`${selector}`, {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  });

  return swiperInstance;
}

swiperBeforeAfter('.swiper-products')
swiperBeforeAfter('.swiper-info-result')
swiperBeforeAfter('.swiper-page-product')

document.addEventListener('DOMContentLoaded', function() {

  // Start PDP Social Proof Data
  const socialProofContainer = document.querySelector('.social-proof-data-container');
  const quantityElement = document.querySelector('.social-proof-data-container #quantity');
  const closeIcon = document.querySelector('.social-proof-data-container .close-icon');
  const containerAtcButton = document.querySelector('.nav_e-commerce .cart-custom');
  const containerAtcButtonProdFaceSerum = document.querySelectorAll('.button_sticky_wrapper');

  if ( socialProofContainer ) {
    let { productId, productHandle, productList } = socialProofContainer.dataset; 
    let url = `https://webhooks.endrock.software/endrockapi/v3/app/analytics/reportsGA4.php?filterBy=productId&store=qure&name=Qure: GA4&productId=`;
    
    // render products purchased quantity and show the social proof container 
    const renderQuantity = (quantity) => { 
      setTimeout(()=>{
        const chatIcon = document.querySelector('iframe#launcher');
        if ( chatIcon ) chatIcon.classList.add('new-bottom');
      },1000);
      

      quantityElement.innerText = quantity;
      if (containerAtcButton) containerAtcButton.setAttribute('style', "bottom: 44px !important"); 
      if (containerAtcButtonProdFaceSerum) containerAtcButtonProdFaceSerum.forEach(btn => btn.classList.add('new-bottom'));  
      
      socialProofContainer.classList.remove('hidden');
    

      closeIcon.addEventListener('click', function () {
        socialProofContainer.classList.add('hidden');
        if ( containerAtcButton ) containerAtcButton.setAttribute('style', "bottom: 25px !important"); 
        if ( document.querySelector('iframe#launcher') ) document.querySelector('iframe#launcher').classList.remove('new-bottom');  
      });

    }

    // handle requests for 1 product or some of them
    if ( productHandle && productList ) {
      let arrProductList = productList.split(', ');
      const requests = arrProductList.map(id => {
        return fetchData(url, id);
      });
      Promise.all(requests)
        .then(responses => {
          let sumPurchased = responses.reduce((acum,cur)=>{
            return acum + cur.data.itemsPurchased; 
          },0);
          if ( sumPurchased > 0) {
            renderQuantity(sumPurchased);
          }
        })
        .catch(error => console.log('error', error));
    } else if ( productId )  {
      fetchData(url, productId)
        .then(response => {
          if ( response.code == 200 ) {
            renderQuantity(response.data.itemsPurchased);
          }
        })
    }

    // fetch items purchased data
    function fetchData (url, id) {
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      return fetch(url+id, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    }
  }

  // End PDP Social Proof Data

  // Start Order by Receive by
  const showReceiveBy = window.showOrderBy;
  if (showReceiveBy) {
    userLocationIP();
  }

  //  PDP: Before & After First Image 

  // Crear el botón
  /*
  const newNavItemHTML = `
  <li class="nav-item" role="presentation">
    <button class="nav-link" 
      data-bs-toggle="pill"
      data-bs-target="#new-tab-pane"
      type="button"
      role="tab"
      aria-controls="new-tab-pane"
      aria-selected="false">
      Dermatologist
    </button>
  </li>
  `;
  const tabList = document.getElementById('pills-tab');
  tabList.insertAdjacentHTML('beforeend', newNavItemHTML);
  const newButton = tabList.querySelector('.nav-link:last-child');

  newButton.addEventListener('click', function() {
    // Remover la clase 'active' de todos los botones
    document.querySelectorAll('.nav-link').forEach(button => {
      button.classList.remove('active');
    });

    // Agregar la clase 'active' solo al nuevo botón
    this.classList.add('active');
  });

  const newTabPane = document.createElement('div');
  newTabPane.classList.add('tab-pane', 'fade');
  newTabPane.setAttribute('id', 'new-tab-pane');
  newTabPane.setAttribute('role', 'tabpanel');
  newTabPane.innerHTML = `
    <video autoplay muted controls>
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `

  const tabContent = document.getElementById('pills-tabContent');
  tabContent.appendChild(newTabPane);
  */

  /*
  const productButton = document.getElementById('productButton');
  const resultButton = document.getElementById('resultButton');
  const dermaButton = document.getElementById('dermaButton');
  */
  const productComponent = document.getElementById('info-product');
  const resultComponent = document.getElementById('info-result');
  const dermaComponent = document.getElementById('info-derma');

  // swiperBeforeAfter('.swiper-products')
  // swiperBeforeAfter('.swiper-info-result')
  // swiperBeforeAfter('.swiper-page-product')

  function showComponent(component) {
    document.querySelectorAll('[id^="info-"]').forEach(component => {
      component.classList.remove('active');
    });
    component.classList.add('active')
  }


  document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', function() {
      const buttonId = this.id
      console.log(buttonId)
      document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
      });

      this.classList.add('active');

      switch (buttonId) {
        case 'productButton':
          showComponent(productComponent);
          break;
        case 'resultButton':
          showComponent(resultComponent);
          break;
        case 'dermaButton':
          showComponent(dermaComponent);
          break;
      }
    });
  });
  /*
  productButton.addEventListener('click', function() {
    showComponent(productComponent);
    resultButton.classList.remove('active');
    productButton.classList.add('active');
    dermaButton.classList.remove('active');
  });

  resultButton.addEventListener('click', function() {
    showComponent(resultComponent);
    resultButton.classList.add('active');
    productButton.classList.remove('active');
    dermaButton.classList.remove('active');
  });

  dermaButton.addEventListener('click', function() {
    showComponent(dermaComponent);
    dermaButton.classList.add('active');
    productButton.classList.remove('active');
    resultButton.classList.remove('active');
  });
  */
  // end PDP: Before & After First Image 

});


