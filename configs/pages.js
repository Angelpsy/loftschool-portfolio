const path = require('path');
const fs = require('fs');
const PATHS = require('./paths');
/**
 * @type {Array}
 */
const pages = fs.readdirSync(PATHS.src + '/pages').filter(function(file) {
    return fs.statSync(path.join(PATHS.src + '/pages', file)).isDirectory();
});

module.exports = pages;
