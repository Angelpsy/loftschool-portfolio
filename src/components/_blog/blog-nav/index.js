import './index.scss';

const CLASSES = {
    navItemActive: 'b-blog-nav-item--active',
};

const container = document.querySelector('.b-blog-nav');

const menuItems = Array.prototype.slice.call(container.querySelectorAll('.b-blog-nav-item'));

// TODO: реализовать смену active при прокрутке
/**
 *
 */
function init() {
    menuItems[0].classList.add(CLASSES.navItemActive);
}

init();
