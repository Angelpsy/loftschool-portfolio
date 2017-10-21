import './index.scss';

const TIME_ANIMATIONS = 550;

const CLASSES = {
    slider: 'b-works-slider',
    sliderAnimated: 'b-works-slider--animated',
    sliderList: 'b-works-slider__list',
    sliderListAnimated: 'b-works-slider__list--animated',
    slide: 'b-works-slide',
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
        /**
         * @type {Element}
         */
        this.el = el;

        /**
         * @type {Element}
         */
        this.container = el.querySelector('.' + CLASSES.sliderList);

        /**
         * {{el: Element}}
         */
        this.slides = Array.prototype.slice.call(this.el.querySelectorAll('.' + CLASSES.slide))
            .map((el) => {
                return {
                    el,
                };
            });
        this.indexActiveSlide = 0;
        this.indexLastSlide = this.slides.length - 1;

        this.isReverse = !!el.dataset.sliderRevers;

        this.init = this.init.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);

        // console.log(this);
    }

    /**
     * @return {Promise}
     */
    nextSlide() {
        return new Promise((resolve, reject) => {
            const indexPrevSlide = this.indexActiveSlide;
            if (++this.indexActiveSlide > this.indexLastSlide) {
                this.indexActiveSlide = 1;
            }
            const indexNextSlide = this.indexActiveSlide;
            this.goSlide(indexPrevSlide, indexNextSlide, this.slides[indexPrevSlide].isCloned)
                .then(() => {
                    if (this.slides[this.indexActiveSlide].isCloned) {
                        this.nextSlide()
                            .then(resolve);
                    } else {
                        resolve();
                    }
                });
        });
    }

    /**
     * @return {Promise}
     */
    prevSlide() {
        return new Promise((resolve, reject) => {
            const indexPrevSlide = this.indexActiveSlide;
            if (--this.indexActiveSlide < 0) {
                this.indexActiveSlide = this.indexLastSlide - 1;
            }
            const indexNextSlide = this.indexActiveSlide;

            this.goSlide(indexPrevSlide, indexNextSlide, this.slides[indexPrevSlide].isCloned)
                .then(() => {
                    if (this.slides[this.indexActiveSlide].isCloned) {
                        this.prevSlide()
                            .then(resolve);
                    } else {
                        resolve();
                    }
                });
        });
    }

    /**
     * @param {Number} indexPrevSlide
     * @param {Number} indexNextSlide
     * @param {Boolean} isNoAnimate
     * @return {Promise}
     */
    goSlide(indexPrevSlide, indexNextSlide, isNoAnimate) {
        return new Promise((resolve, reject) => {
            if (isNoAnimate) {
                // only offset
                this.setPositionsList(indexNextSlide);
                resolve();
            } else {
                // animation and offset
                this.container.classList.add(CLASSES.sliderListAnimated);
                this.el.classList.add(CLASSES.sliderAnimated);
                this.setPositionsList(indexNextSlide);
                setTimeout(() => {
                    this.container.classList.remove(CLASSES.sliderListAnimated);
                    this.el.classList.remove(CLASSES.sliderAnimated);
                    resolve();
                }, TIME_ANIMATIONS); // emulation of animation time
            }
        });
    }

    /**
     * @param {Number} indexNextSlide
     */
    setPositionsList(indexNextSlide) {
        let offset = - indexNextSlide / (this.indexLastSlide + 1) * 100;
        this.container.style.transform = `translateY(${offset}%)`;
    }

    /**
     *
     */
    init() {
        const cloneFirstEl = this.slides[0].el.cloneNode(true);
        const cloneLastEl = this.slides[this.indexLastSlide].el.cloneNode(true);

        // add in html
        this.container.insertBefore(cloneLastEl, this.slides[0].el); // Clone of last in the beginning
        this.container.appendChild(cloneFirstEl); // Clone of first in end

        // add in slides
        this.slides = [].concat([{
            el: cloneLastEl,
            isCloned: true,
        }], this.slides, [{
            el: cloneFirstEl,
            isCloned: true,
        }]);

        this.indexActiveSlide = 1; // ex 0 index
        this.indexLastSlide = this.slides.length - 1;
        this.goSlide(0, 1, true);
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
        this.sliders = Array.prototype.slice.call(this.el.querySelectorAll('.' + CLASSES.slider))
            .map((el) => {
                return new Slider(el);
            });

        this.init = this.init.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.animated = false;
    }

    /**
     *
     */
    nextSlide() {
        this.goSlide('nextSlide');
    }

    /**
     *
     */
    prevSlide() {
        this.goSlide('prevSlide');
    }

    /**
     * @param {String} direction
     */
    goSlide(direction) {
        if (this.animated) {
            return;
        }

        this.animated = true;

        const promises = this.sliders.map((slider) => {
            return slider[direction]();
        });
        Promise.all(promises)
            .then(() => {
                this.animated = false;
            })
            .catch(() => {
                this.animated = false;
            });
    }

    /**
     *
     */
    init() {
        if (this.sliders.some((slider) => {
            return slider.slides.length <= 1;
        })) {
            return;
        }

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
    window.addEventListener('load', superSlider.init);
}

init();
