const __section_bundle = document.currentScript.getAttribute('data-section');
const __form_bundle = document.currentScript.getAttribute('data-form');

document.addEventListener('DOMContentLoaded', function() {

    __bundle__initTemplate(__bundle__getProductType());

    function __bundle__updateProductButtonHref(product_variant_id, soldout) {
        let button = document.querySelector('.' + __section_bundle + ' .productButtonObject');

        if(!product_variant_id) return;

        if (button) {
            if (soldout === 'true') {
                button.setAttribute('href', 'javascript:void(0)');
            } else {
                button.setAttribute('href', '/cart/add?id=' + product_variant_id + '&quantity=1');
            }
        }
    }

    function __bundle__initTemplate(source) {
        if(!source) return;

        const template_form = document.getElementById(__form_bundle + '-source-' + source);
        const target = document.getElementById(__form_bundle + '-body-' + __section_bundle);

        if (template_form && target) {
            const content = template_form.content.cloneNode(true);
            target.innerHTML = '';
            target.appendChild(content);
            __bundle__initScripts();
            __bundle__initProduct();
        }               
    }

    function __bundle__getProductType() {
        return __section_bundle + '-' + __form_bundle;
    }

    function __bundle__initProduct() {
        let checkedInput = document.querySelector('.' + __section_bundle + ' input[type="radio"][name="monthlyPlan_'+ __form_bundle + '"]:checked');

        if (!checkedInput) {
            checkedInput = document.querySelector('.' + __section_bundle + ' input[type="radio"][name="monthlyPlan_'+ __form_bundle + '"]');
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

    function __bundle__initScripts() {
        $('.' + __section_bundle + ' .step_conten_blocks .planBlock').click(__bundle__handlerPlanBlock);
    }

    function __bundle__handlerPlanBlock () {
        var product_variant_id = $(this).attr("data-product_variant_id");
        var soldout = $(this).attr("data-soldout");
        var preorder = $(this).attr("data-preorder");

        __bundle__updateProductButtonHref(product_variant_id, soldout);
        __bundle__clearPreorderBoxes();
        __bundle__tooglePreorderBox(preorder, product_variant_id);

        $('.' + __section_bundle + " .total_price").find(".regular_price").text($(this).find(".regular_price").text());
        $('.' + __section_bundle + " .total_price").find(".sale_price").text($(this).find(".sale_price:visible").text().trim());
        $('.' + __section_bundle + " .btn_value").text($(this).attr("data-per"));
        $('.' + __section_bundle + " .pay_today").text($(this).attr("data-pay"));
    }

    function __bundle__clearPreorderBoxes()
    {
        document.querySelectorAll('.' + __section_bundle + ' .' + __form_bundle + '-preorder-box-item').forEach(el => {
            el.innerHTML = '';
        });
    }

    function __bundle__tooglePreorderBox(preorder, product_variant_id) {
        const preorderBox = document.querySelector('.' + __section_bundle + ' .preorder_box');
        const targetBox = document.querySelector('.' + __section_bundle + ' .' + __form_bundle + '-preorder-box__' + product_variant_id);

        if (!preorderBox || !targetBox) return;
        
        if(preorder === 'true')
        {
            if (preorderBox) 
            {
                preorderBox.classList.remove('hide');
                targetBox.appendChild(preorderBox.cloneNode(true));
                preorderBox.classList.add('hide');

                __bundle__updatePreorderBox(targetBox, product_variant_id);
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

    function __bundle__updatePreorderBox(targetBox, product_variant_id)
    {
        const preorder_text = document.querySelector('.' + __section_bundle + ' .' + __form_bundle + '-product-preorder-text__' + product_variant_id);
        if (preorder_text && preorder_text.innerHTML !== '') {
            targetBox.querySelector('.preorder_text').innerHTML = preorder_text.innerHTML;
        }

        const preorder_date_soldout = document.querySelector('.' + __section_bundle + ' .' + __form_bundle + '-product-preorder_date_soldout__' + product_variant_id);
        if (preorder_date_soldout && preorder_date_soldout.innerHTML !== '') {
            targetBox.querySelector('.preorder_date_soldout').innerHTML = preorder_date_soldout.innerHTML;
        }

        const preorder_date_reserved = document.querySelector('.' + __section_bundle + ' .' + __form_bundle + '-product-preorder_date_reserved__' + product_variant_id);
        if (preorder_date_reserved && preorder_date_reserved.innerHTML !== '') {
            targetBox.querySelector('.preorder_date_reserved').innerHTML = preorder_date_reserved.innerHTML;
        }

        const preorder_percent = document.querySelector('.' + __section_bundle + ' .' + __form_bundle + '-product-preorder_percent__' + product_variant_id);
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