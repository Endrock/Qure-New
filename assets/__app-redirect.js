document.addEventListener('DOMContentLoaded', function() {
    is_country_us().then((isUS) => {
        if (isUS) {
            if(window.location.href.includes('exclusive-holiday-bundle-deal'))
            {
                document.querySelectorAll('.hide_us').forEach(element => {
                    element.style.display = 'none';
                });

                setTimeout(() => {
                    const swiperInstanceMain = document.querySelector('.bfs_mb_sl2').swiper;
                    const swiperInstanceThumbs = document.querySelector('.bfs_mb_sl').swiper;
        
                    if(swiperInstanceMain != undefined)
                    {
                        swiperInstanceMain.removeSlide([1, 7, 8, 10]);
                    }
        
                    if(swiperInstanceThumbs != undefined)
                    {
                        swiperInstanceThumbs.removeSlide([1, 7, 8, 10]);
                    }
                }, 1500)
            }
            if(window.location.href.includes('exclusive-holiday-bundle-deal-new'))
            {
                document.querySelectorAll('.hide_us').forEach(element => {
                    element.style.display = 'none';
                });

                setTimeout(() => {
                    const swiperInstanceMain = document.querySelector('.bfs_mb_sl2').swiper;
                    const swiperInstanceThumbs = document.querySelector('.bfs_mb_sl').swiper;
        
                    if(swiperInstanceMain != undefined)
                    {
                        swiperInstanceMain.removeSlide([1, 7, 8, 10]);
                    }
        
                    if(swiperInstanceThumbs != undefined)
                    {
                        swiperInstanceThumbs.removeSlide([1, 7, 8, 10]);
                    }
                }, 1500)
            }
            else if(window.location.href.includes('exclusive-black-friday'))
            {
                document.querySelectorAll('.hide_us').forEach(element => {
                    element.style.display = 'none';
                });

                setTimeout(() => {
                    const swiperInstanceMain = document.querySelector('.bfs_mb_sl2').swiper;
                    const swiperInstanceThumbs = document.querySelector('.bfs_mb_sl').swiper;
        
                    if(swiperInstanceMain != undefined)
                    {
                        swiperInstanceMain.removeSlide([1, 7, 8, 10]);
                    }
        
                    if(swiperInstanceThumbs != undefined)
                    {
                        swiperInstanceThumbs.removeSlide([1, 7, 8, 10]);
                    }
                }, 1500)
            }
            else if(window.location.href.includes('best-sellers'))
            {
                document.getElementById('q-urify-water-filter').style.display = 'none';
            }
            else if(window.location.href.includes('acne-breakouts'))
            {
                document.getElementById('q-urify-water-filter').style.display = 'none';
            }
            else if(window.location.href.includes('fine-line-wrinkles'))
            {
                document.getElementById('q-urify-water-filter').style.display = 'none';
            }
            /* */
            else if(window.location.href.includes('breakout-control-pro-1'))
            {
                window.location = 'https://www.qureskincare.com/pages/exclusive-holiday-bundle-deal';
            }
            else if(window.location.href.includes('breakout-control-starter'))
            {
                window.location = 'https://www.qureskincare.com/pages/exclusive-holiday-bundle-deal';
            }
            else if(window.location.href.includes('filter-family-bundle'))
            {
                window.location = 'https://www.qureskincare.com/pages/exclusive-holiday-bundle-deal';
            }
            else if(window.location.href.includes('line-refine-bundle-advanced-1'))
            {
                window.location = 'https://www.qureskincare.com/pages/exclusive-holiday-bundle-deal';
            }
            if(window.location.href.includes('/pages/shower-filter-trynow'))
            {
                window.location = 'https://www.qureskincare.com/products/shower-filter';
            }
        }
        else
        {
            if(window.location.href.includes('/pages/shower-filter-trynow'))
            {
                window.location = 'https://www.qureskincare.com/products/shower-filter';
            }
        }
    }).catch((err) => {
        console.error("Can't detect redirect country", err);
    });
});