document.addEventListener('DOMContentLoaded', function() {

    const swiper = new Swiper('.serumSwiper', {
        slidesPerView: 1.6,
        spaceBetween: 24,
        centeredSlides: false,
        loop: false,
        slidesPerGroup: 1,
        navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
        },
        breakpoints: {
            768: {
                slidesPerView: 1.6,
                spaceBetween: 24,
            },
            480: {
                slidesPerView: 1.2,
                spaceBetween: 20,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 15,
            }
        },
        on: {
            init: function() {
                disableNextButton(this);
            },
            slideChange: function() {
                updatePageIndicator(this);
                disableNextButton(this);
            },
        }
    });


    function updatePageIndicator(swiperInstance) {
        const currentSlide = document.querySelector('.current-slide');
        const totalSlides = document.querySelector('.total-slides');
        
        if (currentSlide && totalSlides) {
            currentSlide.textContent = swiperInstance.realIndex + 1;
            totalSlides.textContent = swiperInstance.slides.length - 1; 
        }
    }

    function disableNextButton(swiperInstance) {
        const currentIndex = swiperInstance.realIndex + 1; 
        const currentSlide = document.querySelector('.current-slide');

        if ( currentIndex == (swiperInstance.slides.length - 1) ) {
            document.querySelector('.swiper-button-next-custom').classList.add('disabled');
            document.querySelector('.swiper-button-next-custom').setAttribute('disabled', 'disabled');
        }
        else {
            if (document.querySelector('.swiper-button-next-custom.disabled')) {
                document.querySelector('.swiper-button-next-custom.disabled').classList.remove('disabled');
                document.querySelector('.swiper-button-next-custom').removeAttribute('disabled');
            }
        }
    }

});