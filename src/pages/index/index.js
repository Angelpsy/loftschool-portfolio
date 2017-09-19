import '../../templates/base/index';
import './index.scss';

import '../../components/_index/index-header/index';
import '../../components/_index/index-card/index';
import '../../components/login-form/index';
import '../../components/simple-footer/index';

import {events} from '../../common/scripts/events';

const CLASSES = {
    main: 'p-index__main',
    mainLogin: 'p-index__main--open-login',
};

const container = document.querySelector('.p-index');

const mainEl = container.querySelector('.' + CLASSES.main);

/**
 *
 */
function init() {
    document.addEventListener(events.openLoginForm.id, function(event) {
        mainEl.classList.add(CLASSES.mainLogin);
    }, false);

    document.addEventListener(events.closeLoginForm.id, function(event) {
        mainEl.classList.remove(CLASSES.mainLogin);
    }, false);
}

init();
