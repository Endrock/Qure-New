    document.addEventListener('DOMContentLoaded', function() {

        initTemplate(getProductType());

        document.querySelectorAll('.' + purchase_form_section_id + ' .serumBlock').forEach(function(element) {
            element.addEventListener('click', function() {
                const id = this.id;
                initTemplate(id);
            });
        });

        function updateProductButtonHref(product_variant_id, soldout) {
            let button = document.querySelector('.' + purchase_form_section_id + ' .productButtonObject');

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

            const template_form = document.getElementById('purchase-form-source-' + source);
            const target = document.getElementById('purchase-form-body');

            if (template_form && target) {
                const content = template_form.content.cloneNode(true);
                target.innerHTML = '';
                target.appendChild(content);
                initScripts();
                initProduct();
            }               
        }

        function getProductType() {
            let checkedInput = document.querySelector('.' + purchase_form_section_id + ' input[type="radio"][name="serum"]:checked');

            if (!checkedInput) {
                checkedInput = document.querySelector('.' + purchase_form_section_id + ' input[type="radio"][name="serum"]');
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
            let checkedInput = document.querySelector('.' + purchase_form_section_id + ' input[type="radio"][name="monthlyPlan"]:checked');

            if (!checkedInput) {
                checkedInput = document.querySelector('.' + purchase_form_section_id + ' input[type="radio"][name="monthlyPlan"]');
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
            $('.' + purchase_form_section_id + ' .step_conten_blocks .planBlock').click(__handlerPlanBlock);
            $('.' + purchase_form_section_id + ' .cs_item__accordion').click(__handlerItemAccordion);
        }

        function __handlerSerumBlock() {
            
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
            tooglePreorderBox(preorder);

            $('.' + purchase_form_section_id + " .total_price").find(".regular_price").text($(this).find(".regular_price").text());
            $('.' + purchase_form_section_id + " .total_price").find(".sale_price").text($(this).find(".sale_price:visible").text().trim());
            $('.' + purchase_form_section_id + " .btn_value").text($(this).attr("data-per"));
            $('.' + purchase_form_section_id + " .pay_today").text($(this).attr("data-pay"));
            $('.' + purchase_form_section_id + " #choosen_image").attr("src", $(this).attr("data-image"));
            
            $('.' + purchase_form_section_id + ' .tab_content').hide();
            $('.' + purchase_form_section_id + ' .step_conten_blocks .planBlock').removeClass('active');
            $(this).addClass('active');

            $('.' + purchase_form_section_id + ' #' + $(this).data('tab')).show();
        }

        function tooglePreorderBox(preorder) {
            let preorderBox = document.querySelector('.' + purchase_form_section_id + ' .preorder_box');

            if(preorder === 'true')
            {
                if (preorderBox) preorderBox.classList.remove('hide');
            }
            else
            {
                if (preorderBox) preorderBox.classList.add('hide');
            }
        }
    });