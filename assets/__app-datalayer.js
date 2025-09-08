document.addEventListener('__app-datalayer.purchaseForm', (event) => {

    console.log('>>> aaaaqqqq1 >>> purchase-form', event.detail);

    //skip default product_variant_id
    if(event.detail.event == 'purchase-form') {
        if(event.detail.product_category === undefined) return;
    }

    if(event.detail.url == "/pages/microinfusion" || event.detail.url == "/pages/qure-microinfusion-offer") {
        console.log('>>> aaaaqqqq2 >>> purchase-form', event.detail);
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