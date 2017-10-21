import '../../templates/base/index';
import preloader from '../../components/preloader/index';

import '../../components/_index/index-header/index';
import '../../components/_index/index-card/index';
import {bg} from 'src/components/_index/index-bg/index'; // WebGl, TODO: оптимизировать производительность
import '../../components/login-form/index';
import '../../components/simple-footer/index';

import {loaderCss} from 'src/common/scripts/common';
import {client} from 'src/common/scripts/helpers/media';

import './index.scss';

import {events} from '../../common/scripts/events';
import {isLocalStorageSupported} from 'src/common/scripts/helpers/localStorage';

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


    const isPreloaderVisited = isLocalStorageSupported && localStorage.getItem('isPreloaderVisited');

    if (!isPreloaderVisited) {
        localStorage.setItem('isPreloaderVisited', true);
    }

    const _promises = [
        new Promise((resolve, reject) => {
            window.addEventListener('load', function x() {
                resolve();
                window.removeEventListener('load', x);
            });
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, isPreloaderVisited ? 1 : 2500);
        }),
        loaderCss,
    ];

    if (client.isMedium || client.isMax) {
        _promises.push(
            bg.init()
        );
    }


    Promise.all(_promises)
        .then(() => {
            preloader.hide();
        })
        .catch((err) => {
            preloader.hide();
            // eslint-disable-next-line no-console
            console.log(err);
        });
}

init();
