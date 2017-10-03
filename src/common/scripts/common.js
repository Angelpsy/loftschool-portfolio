import 'normalize.css';
import '../styles/fonts.scss';
import '../styles/utility.scss';
import '../styles/common.scss';
import '../styles/layout.scss';

// async style
[window.nameFileCssCommon, window.nameFileCssChunk].forEach((url) => {
    const el = document.createElement('link');
    el.rel = 'stylesheet';
    el.href = url;
    document.querySelector('head').appendChild(el);
});
