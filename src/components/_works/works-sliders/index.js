import './index.scss';

const CLASSESS = {
    slider: 'b-works-slider',
    slide: 'b-works-slide',
    slideEmpty: 'b-works-slide--empty',
    slideHide: 'b-works-slide--hide',
    slideActive: 'b-works-slide--active',
};

const container = document.querySelector('.b-works-sliders');

/**
 *
 */
class Slider {
    /**
     * @param {Element} el
     */
    constructor(el) {
        this.el = el;
        this.slides = Array.prototype.slice.call(this.el.querySelectorAll('.' + CLASSESS.slide));
        this.indexActiveSlide = 0;
        this.indexLastSlide = this.slides.length - 1;

        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
    }

    /**
     *
     */
    nextSlide() {
        this.slides[this.indexActiveSlide].classList.add(CLASSESS.slideHide);
        this.slides[this.indexActiveSlide].classList.remove(CLASSESS.slideActive);
        if (++this.indexActiveSlide > this.indexLastSlide) {
            this.indexActiveSlide = 0;
        }
        this.slides[this.indexActiveSlide].classList.add(CLASSESS.slideActive);
        this.slides[this.indexActiveSlide].classList.remove(CLASSESS.slideHide);
    }

    /**
     *
     */
    prevSlide() {
        this.slides[this.indexActiveSlide].classList.add(CLASSESS.slideHide);
        this.slides[this.indexActiveSlide].classList.remove(CLASSESS.slideActive);
        if (--this.indexActiveSlide < 0) {
            this.indexActiveSlide = this.indexLastSlide;
        }
        this.slides[this.indexActiveSlide].classList.add(CLASSESS.slideActive);
        this.slides[this.indexActiveSlide].classList.remove(CLASSESS.slideHide);
    }

    /**
     *
     */
    init() {
        this.slides.forEach((slide, index) => {
            if (index) {
                slide.classList.add(CLASSESS.slideHide);
            } else {
                slide.classList.add(CLASSESS.slideActive);
            }
        });
    }
}

/**
 *
 */
class SuperSlider {
    /**
     * @param {Element} el
     */
    constructor(el) {
        this.el = el;
        this.btnsPrev = Array.prototype.slice.call(this.el.querySelectorAll('.js-sliders-btn-prev'));
        this.btnsNext = Array.prototype.slice.call(this.el.querySelectorAll('.js-sliders-btn-next'));
        this.sliders = Array.prototype.slice.call(this.el.querySelectorAll('.' + CLASSESS.slider))
            .map((el) => {
                return new Slider(el);
            });
        this.indexActiveSlide = 0;

        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
    }

    /**
     *
     */
    nextSlide() {
        this.sliders.forEach((slider) => {
            slider.nextSlide();
        });
    }

    /**
     *
     */
    prevSlide() {
        this.sliders.forEach((slider) => {
            slider.prevSlide();
        });
    }

    /**
     *
     */
    init() {
        this.sliders.forEach((slider) => {
            slider.init();
        });

        this.btnsPrev.forEach((btn) => {
            btn.addEventListener('click', this.prevSlide);
        });

        this.btnsNext.forEach((btn) => {
            btn.addEventListener('click', this.nextSlide);
        });
    }
}

/**
 *
 */
function init() {
    const superSlider = new SuperSlider(container);
    superSlider.init();
}

init();
