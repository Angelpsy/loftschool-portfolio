import './index.scss';

import {isLocalStorageSupported} from 'src/common/scripts/helpers/localStorage';

const CLASSES = {
    preloaderHide: 'b-preloader--hide',
};

const container = document.querySelector('.b-preloader');

/**
 *
 */
function init() {
    const isPreloaderVisited = isLocalStorageSupported && localStorage.getItem('isPreloaderVisited');

    if (!isPreloaderVisited) {
        localStorage.setItem('isPreloaderVisited', true);
    }
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
            }, isPreloaderVisited ? 1 : 2500);
        }),
    ])
        .then(() => {
            container.classList.add(CLASSES.preloaderHide);
        });
}

init();
