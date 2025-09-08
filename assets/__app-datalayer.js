document.addEventListener('__app-datalayer.purchaseForm', (event) => {
    //skip default product_variant_id
    if(event.detail.event == 'purchase-form') {
        if(event.detail.product_category === undefined) return;
    }

    if(event.detail.url == "/pages/microinfusion" || event.detail.url == "/pages/qure-microinfusion-offer") {
        window.dataLayer.push(event.detail);
    }
});


document.addEventListener('__app-datalayer.purchaseFormUpdate', (event) => {
    if(event.detail.url == "/pages/microinfusion" || event.detail.url == "/pages/qure-microinfusion-offer") {
        cartRequestChange({ 
            id: event.detail.key,
            properties: {
                __purchase_form: event.detail.url,
            }
        },  {} )
    }
});