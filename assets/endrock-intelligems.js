/* intelligems */
$(document).ready(function () {
   $('.step_conten_blocks .planBlock').click(function () {
    if (typeof intelligemsProduct !== "undefined" && intelligemsProduct !== null && intelligemsProduct !== "") {
      $(".total_price").find(".regular_price").attr("data-product-id", intelligemsProduct);
      $(".total_price").find(".sale_price").attr("data-product-id", intelligemsProduct);
    }
  });

  window.addEventListener('ig:ready', () => {
    $('.step_conten_blocks .planBlock').click(function () {
      var intelligemsProduct = $(this).find(".sale_price:visible").attr("data-product-id");
      $(".total_price").find(".regular_price").attr("data-product-id", intelligemsProduct);
      $(".total_price").find(".sale_price").attr("data-product-id", intelligemsProduct);
      $(".pay_today").attr("data-product-id", intelligemsProduct);
    });
  })
});

/* intelligems */