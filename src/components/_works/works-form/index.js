import './index.scss';

import '../../title/index';

const CLASSES = {
    blurEl: 'b-works-form__blur',
};

const container = document.querySelector('.b-works-form');

const sectionEl = document.querySelector('.b-works-what');

const blurEl = document.createElement('div');

blurEl.classList.add(CLASSES.blurEl);

/**
 *
 */
function drawBlur() {
    const w = sectionEl.offsetWidth;
    const h = sectionEl.offsetHeight;
    const l = container.offsetLeft;
    const b = h - (container.offsetTop + container.offsetHeight);

    blurEl.style.width = w + 'px';
    blurEl.style.height = h + 'px';
    blurEl.style.left = `-${l}px`;
    blurEl.style.bottom = `-${b}px`;
}

/**
 *
 */
function init() {
    container.appendChild(blurEl);
    drawBlur();

    window.addEventListener('resize', drawBlur);
}

window.addEventListener('load', init);
