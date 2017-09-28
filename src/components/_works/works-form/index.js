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
    // const t = container.offsetTop;
    const b = h - (container.offsetTop + container.offsetHeight);

    blurEl.style.width = w + 'px';
    blurEl.style.height = h + 'px';
    blurEl.style.left = `-${l}px`;
    blurEl.style.bottom = `-${b}px`;

    console.log(b);
}

/**
 *
 */
function init() {
    container.appendChild(blurEl);
    drawBlur();

    // setTimeout(drawBlur, 1000);

    window.addEventListener('resize', drawBlur);

    Array.prototype.slice.call(container.querySelectorAll('textarea')).forEach((el) => {
        el.addEventListener('resize', drawBlur);
    });
}

window.addEventListener('load', init);
