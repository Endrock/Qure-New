const __section = document.currentScript.getAttribute('data-section');
const __form = document.currentScript.getAttribute('data-form');

document.addEventListener('DOMContentLoaded', function() {

    initTemplate(getProductType());

    document.querySelectorAll('.' + __section + ' .serumBlock').forEach(function(element) {
        element.addEventListener('click', function() {
            const id = this.id;
            initTemplate(id);
            window.dispatchEvent(new CustomEvent('appPurchaseForm', {
                detail: {
                    element: this
                }
            }));
        });
    });

    function updateProductButtonHref(product_variant_id, soldout) {
        let button = document.querySelector('.' + __section + ' .productButtonObject');

        if(!product_variant_id) return;

        if (button) {
            if (soldout === 'true') {
                button.setAttribute('href', 'javascript:void(0)');
            } else {
                button.setAttribute('href', '/cart/add?id=' + product_variant_id + '&quantity=1');
            }
        }
    }

    function initTemplate(source) {
        if(!source) return;

        const template_form = document.getElementById(__form + '-source-' + source);
        const target = document.getElementById(__form + '-body-' + __section);

        if (template_form && target) {
            const content = template_form.content.cloneNode(true);
            target.innerHTML = '';
            target.appendChild(content);
            initScripts();
            initProduct();
        }               
    }

    function getProductType() {

        let checkedInput = document.querySelector('.' + __section + ' input[type="radio"][name="serum_'+ __form + '"]:checked');

        if (!checkedInput) {
            checkedInput = document.querySelector('.' + __section + ' input[type="radio"][name="serum_'+ __form + '"]');
        }
        
        if (checkedInput) {
            checkedInput.checked = true;
            const serumBlock = checkedInput.closest('.serumBlock');
            if (serumBlock && serumBlock.id) {
                return serumBlock.id;
            }
        }

        return false;
    }

    function initProduct() {
        let checkedInput = document.querySelector('.' + __section + ' input[type="radio"][name="monthlyPlan_'+ __form + '"]:checked');

        if (!checkedInput) {
            checkedInput = document.querySelector('.' + __section + ' input[type="radio"][name="monthlyPlan_'+ __form + '"]');
        }

        if(checkedInput)
        {
            checkedInput.checked = true;
            const planBlock = checkedInput.closest('.planBlock');

            if (planBlock) {
                planBlock.click();
            }
        }           
    }

    function initScripts() {
        $('.' + __section + ' .step_conten_blocks .planBlock').click(__handlerPlanBlock);
        $('.' + __section + ' .cs_item__accordion').click(__handlerItemAccordion);
    }

    function __handlerItemAccordion() {
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    }

    function __handlerPlanBlock () {
        var product_variant_id = $(this).attr("data-product_variant_id");
        var soldout = $(this).attr("data-soldout");
        var preorder = $(this).attr("data-preorder");

        updateProductButtonHref(product_variant_id, soldout);
        clearPreorderBoxes();
        tooglePreorderBox(preorder, product_variant_id);

        $('.' + __section + " .total_price").find(".regular_price").text($(this).find(".regular_price").text());
        $('.' + __section + " .total_price").find(".sale_price").text($(this).find(".sale_price:visible").text().trim());
        $('.' + __section + " .btn_value").text($(this).attr("data-per"));
        $('.' + __section + " .pay_today").text($(this).attr("data-pay"));
        $('.' + __section + " #choosen_image").attr("src", $(this).attr("data-image"));
        
        $('.' + __section + ' .tab_content').hide();
        $('.' + __section + ' #' + $(this).data('tab')).show();
    }

    function clearPreorderBoxes()
    {
        document.querySelectorAll('.' + __section + ' .' + __form + '-preorder-box-item').forEach(el => {
            el.innerHTML = '';
        });
    }

    function tooglePreorderBox(preorder, product_variant_id) {
        const preorderBox = document.querySelector('.' + __section + ' .preorder_box');
        const targetBox = document.querySelector('.' + __section + ' .' + __form + '-preorder-box__' + product_variant_id);

        if (!preorderBox || !targetBox) return;
        
        if(preorder === 'true')
        {
            if (preorderBox) 
            {
                preorderBox.classList.remove('hide');
                targetBox.appendChild(preorderBox.cloneNode(true));
                preorderBox.classList.add('hide');

                updatePreorderBox(targetBox, product_variant_id);
            }
        }
        else
        {
            if (preorderBox) 
            {
                preorderBox.classList.add('hide');
            }
        }
    }

    function updatePreorderBox(targetBox, product_variant_id)
    {
        const preorder_text = document.querySelector('.' + __section + ' .' + __form + '-product-preorder-text__' + product_variant_id);
        if (preorder_text && preorder_text.innerHTML !== '') {
            targetBox.querySelector('.preorder_text').innerHTML = preorder_text.innerHTML;
        }

        const preorder_date_soldout = document.querySelector('.' + __section + ' .' + __form + '-product-preorder_date_soldout__' + product_variant_id);
        if (preorder_date_soldout && preorder_date_soldout.innerHTML !== '') {
            targetBox.querySelector('.preorder_date_soldout').innerHTML = preorder_date_soldout.innerHTML;
        }

        const preorder_date_reserved = document.querySelector('.' + __section + ' .' + __form + '-product-preorder_date_reserved__' + product_variant_id);
        if (preorder_date_reserved && preorder_date_reserved.innerHTML !== '') {
            targetBox.querySelector('.preorder_date_reserved').innerHTML = preorder_date_reserved.innerHTML;
        }

        const preorder_percent = document.querySelector('.' + __section + ' .' + __form + '-product-preorder_percent__' + product_variant_id);
        if (preorder_percent && preorder_percent.innerHTML !== '') {
            targetBox.querySelector('.preorder_percent').innerHTML = preorder_percent.innerHTML;

            const match = preorder_percent.innerHTML.match(/\d+%/);
            if (match) {
                const percentText = match[0];
                targetBox.querySelector('.preorder_percent').style.setProperty('--bgPercent', percentText);
            }                
        }            
    }

});