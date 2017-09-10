const path = require('path');

/**
 * @type {{src: string, dev: string, build: string, static: string, public: string}}
 */
const PATHS = {
    src: path.join(__dirname, '..', 'src'),
    dev: path.join(__dirname, '..', 'dev'),
    build: path.join(__dirname, '..', 'build'),
    static: 'static/',
    public: '/',
    pages: 'pages/',
};

module.exports = PATHS;
