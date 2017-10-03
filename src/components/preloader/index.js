import './index.scss';

const CLASSES = {
    preloaderHide: 'b-preloader--hide',
};

const container = document.querySelector('.b-preloader');

/**
 *
 */
function init() {
    Promise.all([
        new Promise((resolve, reject) => {
            window.addEventListener('load', function x() {
                resolve();
                window.removeEventListener('load', x);
            });
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 2500);
        }),
    ])
        .then(() => {
            container.classList.add(CLASSES.preloaderHide);
        });
}

init();
