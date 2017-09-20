import './index.scss';

import '../title/index';
import '../icon/index';
import '../ui/checkbox/index';
import '../ui/radio-button/index';


import {events} from '../../common/scripts/events';

const container = document.querySelector('.b-login-form');

const btns = Array.prototype.slice.call(container.querySelectorAll('.js-go-home'));

/**
 * @param {Event} event
 */
function dispatchCloseLoginForm(event) {
    event.target.dispatchEvent(events.closeLoginForm.event);
}

/**
 *
 */
function init() {
    btns.forEach((btn) => {
        btn.addEventListener('click', dispatchCloseLoginForm);
    });
}

init();
