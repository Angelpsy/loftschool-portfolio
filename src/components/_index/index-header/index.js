import './index.scss';

import '../index-header-btn/index';

import {events} from '../../../common/scripts/events';

const container = document.querySelector('.b-index-header');

const btns = Array.prototype.slice.call(container.querySelectorAll('.js-open-login-form'));

const CLASSES = {
    menu: 'b-index-header__menu',
    menuHide: 'b-index-header__menu--hide',
};

const menuEl = container.querySelector('.' + CLASSES.menu);

/**
 * @param {Event} event
 */
function dispatchOpenLoginForm(event) {
    event.target.dispatchEvent(events.openLoginForm.event);
}

/**
 *
 */
function init() {
    btns.forEach((btn) => {
        btn.addEventListener('click', dispatchOpenLoginForm);
    });

    document.addEventListener(events.openLoginForm.id, function(event) {
        menuEl.classList.add(CLASSES.menuHide);
    }, false);

    document.addEventListener(events.closeLoginForm.id, function(event) {
        menuEl.classList.remove(CLASSES.menuHide);
    }, false);
}

init();
