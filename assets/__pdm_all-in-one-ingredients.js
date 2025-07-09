       document.addEventListener('DOMContentLoaded', function() {
            // Inicializar Swiper
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
                        updatePageIndicator(this);
                        disableNextButton(this);
                    },
                    slideChange: function() {
                        updatePageIndicator(this);
                        disableNextButton(this);
                    }
                }
            });

            // Función para actualizar el indicador de página
            function updatePageIndicator(swiperInstance) {
                const currentSlide = document.querySelector('.current-slide');
                const totalSlides = document.querySelector('.total-slides');
                
                if (currentSlide && totalSlides) {
                    // Swiper en modo loop cuenta slides duplicados, así que usamos realIndex
                    currentSlide.textContent = swiperInstance.realIndex + 1;
                    totalSlides.textContent = swiperInstance.slides.length - 1; // Restamos 1 por la slide vacía añadida
                }
            }

            // desactivar flecha derecha antes de llegar al ultimo slide

            function disableNextButton(swiperInstance) {
                const currentIndex = swiperInstance.realIndex + 1; // +1 porque realIndex empieza en 0
                const currentSlide = document.querySelector('.current-slide');

                console.log('Current Slide Index:', currentIndex);
                console.log('currentSlide:', currentSlide);
                

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