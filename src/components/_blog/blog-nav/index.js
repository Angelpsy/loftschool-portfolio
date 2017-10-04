import '../../anchor/index';

import './index.scss';

import {events} from 'src/common/scripts/events';

const CLASSES = {
    navItemActive: 'b-blog-nav-item--active',
};

const container = document.querySelector('.b-blog-nav');

const menuItems = Array.prototype.slice.call(container.querySelectorAll('.b-blog-nav-item'));
const menuItemsLinks = Array.prototype.slice
    .call(container.querySelectorAll('.b-blog-nav-item .b-blog-nav-item__link'));
let indexActiveItem = 0;

/**
 *
 */
function init() {
    document.addEventListener(events.viewElement.id, function(event) {
        const href = '#' + event.target.id;
        if (href !== menuItemsLinks[indexActiveItem].href) {
            menuItems[indexActiveItem].classList.remove(CLASSES.navItemActive);
            menuItemsLinks.some((link, index) => {
                if (link.href.replace(/[^#]*(.*)/, '$1') === href) {
                    indexActiveItem = index;
                    menuItems[indexActiveItem].classList.add(CLASSES.navItemActive);
                    return true;
                }
                return false;
            });
        }
    }, false);
}

init();
