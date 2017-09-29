import './index.scss';

import {animate} from '../../common/scripts/helpers/animate';

const anchors = Array.prototype.slice.call(document.querySelectorAll('.js-anchor[href^="#"]'));

/**
 * Duration (ms)
 * @type {number}
 */
const DURATION = 1000;


// http://shpargalkablog.ru/2014/10/smooth-scrolling.html
/**
 * @param {Event} e
 */
function animateScroll(e) {
    const href = e.target.href
        && e.target.classList.contains('js-anchor')
        ? e.target.href
        : e.target.closest('.js-anchor[href]').href;
    if (!href) {
        return;
    }
    e.preventDefault();
    const yScroll = window.pageYOffset; // прокрутка
    const hash = href.replace(/[^#]*(.*)/, '$1'); // id элемента, к которому нужно перейти
    const targetPositionTop = document.querySelector(hash).getBoundingClientRect().top; // отступ от окна браузера до id

    const draw = (progress) => {
        window.scrollTo(0, yScroll + targetPositionTop * progress);
    };

    animate({
        duration: DURATION,
        timing: (timeFraction) => timeFraction, // linear
        draw,
    })
        .then(() => {
            location.hash = hash;
        });
}

/**
 *
 */
function init() {
    anchors.forEach((anchor) => {
        anchor.addEventListener('click', animateScroll);
    });
}

init();
