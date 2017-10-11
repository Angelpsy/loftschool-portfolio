import 'normalize.css';
import '../styles/fonts.scss';
import '../styles/utility.scss';
import '../styles/common.scss';
import '../styles/layout.scss';

/**
 * async styles
  * @type {String[]|null[]}
 */
const cssFiles = [window.nameFileCssCommon, window.nameFileCssChunk];

/**
 * @type {Promise.<*[]>}
 */
const loaderCss = Promise.all(cssFiles.map((url) => {
    return new Promise((resolve, reject) => {
        if (!url) {
            resolve();
        }
        const el = document.createElement('link');
        el.rel = 'stylesheet';
        el.href = url;
        document.querySelector('head').appendChild(el);
        el.onload = resolve;
        el.onerror = reject;
    });
}));

export {loaderCss};
