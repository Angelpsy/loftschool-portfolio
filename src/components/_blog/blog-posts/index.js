import '../../content/index';

import './index.scss';

import {throttle} from 'src/common/scripts/helpers/throttle';
import {events} from 'src/common/scripts/events';

const container = document.querySelector('.b-blog-posts');

/**
 * @type Element[]
 */
const postsEls = Array.prototype.slice.call(container.querySelectorAll('.b-blog-post'));

/**
 * @param {Element} elem
 * @return {{top: number, left: number}}
 */
function getCoords(elem) { // кроме IE8-
    const box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
    };
}

/**
 *
 */
function init() {
    const posts = postsEls.map((el) => {
        return {
            id: el.id,
            el: el,
            top: getCoords(el).top,
        };
    })
        .sort((a, b) => {
            return b.top - a.top;
        });
    let hWindow = window.innerHeight;
    let idCurrent = '';


    let resizeHandler = () => {
        hWindow = window.innerHeight;
        posts.forEach((post) => {
            post.top = getCoords(post.el).top;
        })
            .sort((a, b) => {
                return b.top - a.top;
            });
    };

    resizeHandler = throttle(resizeHandler, 300);

    window.addEventListener('resize', resizeHandler);

    let scrollHandler = () => {
        posts.some((post) => {
            if (pageYOffset + hWindow / 2 >= post.top) { // If border-top is above the middle of the window
                if (idCurrent !== post.id) {
                    idCurrent = post.id;
                    post.el.dispatchEvent(events.viewElement.event);
                }
                return true;
            } else {
                return false;
            }
        });
    };

    scrollHandler();

    scrollHandler = throttle(scrollHandler, 300);

    window.addEventListener('scroll', scrollHandler);
}

window.addEventListener('load', init);
