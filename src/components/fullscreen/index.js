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

/**
 * @type {Element[]}
 */
const links = Array.prototype.slice.call(container.querySelectorAll('a'));

/**
 * @type {boolean}
 */
let menuIsOpen = container.classList.contains(CLASSES.containerActive);


/**
 * @param {Boolean} menuIsOpen
 * @param {Element[]} elements
 */
function toggleTabindexLinks(menuIsOpen, elements) {
    const tabindex = menuIsOpen ? 100 : -1;
    elements.forEach((link) => {
        link.setAttribute('tabindex', tabindex);
    });
}

// TODO: реализовать зацикливание перехода по tab при открытии меню
// TODO: реализовать закрытие по esc
/**
 * @param {Event} event
 */
function toggleMenu(event) {
    container.classList.toggle(CLASSES.containerActive);
    menuIsOpen = !menuIsOpen;
    toggleTabindexLinks(menuIsOpen, links);
}

/**
 *
 */
(function init() {
    btn.addEventListener('click', toggleMenu);
    toggleTabindexLinks(menuIsOpen, links);
})();
