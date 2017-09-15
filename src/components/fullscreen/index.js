import './index.scss';

import '../menu-fullscreen/index';

const CLASSES = {
    containerActive: 'b-fullscreen--active',
};

/**
 * @type {Element}
 */
const container = document.querySelector('.b-fullscreen');

/**
 * @type {Element}
 */
const btn = container.querySelector('.js-togle-menu-fullscreen');

btn.addEventListener('click', toggleMenu);

/**
 * @param {Event} event
 */
function toggleMenu(event) {
    container.classList.toggle(CLASSES.containerActive);
}
