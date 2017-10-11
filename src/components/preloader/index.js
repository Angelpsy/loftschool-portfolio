import './index.scss';

const CLASSES = {
    preloaderHide: 'b-preloader--hide',
};

const container = document.querySelector('.b-preloader');

/**
 *
 */
class Preloader {
    /**
     * @param {Element} container
     */
    constructor(container) {
        this.container = container;
    }

    /**
     *
     */
    hide() {
        this.container.classList.add(CLASSES.preloaderHide);
    }
}

const preloader = new Preloader(container);

export default preloader;
