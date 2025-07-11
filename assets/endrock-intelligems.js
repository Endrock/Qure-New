/* intelligems */
  window.addEventListener('ig:ready', () => {
    $('.step_conten_blocks .planBlock').click(function () {
      var intelligemsProduct = $(this).find(".sale_price:visible")?.attr("data-variant-id");
      if (!intelligemsProduct) return;
      $(".total_price").find(".regular_price")?.attr("data-variant-id", intelligemsProduct);
      $(".total_price").find(".sale_price")?.attr("data-variant-id", intelligemsProduct);
      $(".pay_today")?.attr("data-variant-id", intelligemsProduct);
      console.log("Intelligems product variant ID set to: " + intelligemsProduct);
    });

  });
/* intelligems */