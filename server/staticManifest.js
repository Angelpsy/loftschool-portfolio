const fs = require('fs');
const path = require('path');

const PATH = require('../configs/paths');

let staticManifest = JSON.parse(fs.readFileSync(path.join(PATH.build, 'manifest.json')));

module.exports = staticManifest;
