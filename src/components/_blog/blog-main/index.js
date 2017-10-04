import '../blog-nav/index';
import '../blog-posts/index';

import './index.scss';

import {client} from '../../../common/scripts/helpers/media';

const CLASSES = {
    sidebarOpen: 'b-blog-main__sidebar--open',
};

const container = document.querySelector('.b-blog-main');
const sidebar = container.querySelector('.b-blog-main__sidebar');
const btns = Array.prototype.slice.call(container.querySelectorAll('.js-open-sidebar'));

/**
 *
 */
function toggleSidebar() {
    if (client.isPhone || client.isIpad) {
        sidebar.classList.toggle(CLASSES.sidebarOpen);
    }
}

/**
 *
 */
function init() {
    btns.forEach((btn) => {
        btn.addEventListener('click', toggleSidebar);
    });
}

init();
