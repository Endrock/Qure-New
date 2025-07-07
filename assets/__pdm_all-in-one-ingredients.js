       document.addEventListener('DOMContentLoaded', function() {
            // Inicializar Swiper
            const swiper = new Swiper('.serumSwiper', {
                slidesPerView: 1.6,
                spaceBetween: 30,
                centeredSlides: false,
                loop: true,
                speed: 800,
                slidesPerGroup: 1,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 1.6,
                        spaceBetween: 30,
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
                    },
                    slideChange: function() {
                        updatePageIndicator(this);
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
                    totalSlides.textContent = swiperInstance.slides.length - 2; // Restamos los slides duplicados del loop
                }
            }

            // Pausar autoplay cuando el usuario interactúa
            const swiperContainer = document.querySelector('.serumSwiper');
            
            swiperContainer.addEventListener('mouseenter', () => {
                swiper.autoplay.stop();
            });
            
            swiperContainer.addEventListener('mouseleave', () => {
                swiper.autoplay.start();
            });
        });