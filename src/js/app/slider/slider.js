import Swiper from 'swiper';

export class Slider {
    constructor() {
        this.settings = {
            loop: true,
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
            }
        }
    }

    init() {
        this.slider = new Swiper('.swiper-container', this.settings);
    }
}
