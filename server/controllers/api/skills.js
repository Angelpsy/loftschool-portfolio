const fs = require('fs');
const path = require('path');

const PATH = require('../../../configs/paths');

const data = JSON.parse(
    fs.readFileSync(path.join(PATH.src, 'data', 'skills.json'))
)
    .data;

/**
 *
 */
const ctrl = {

    /**
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    getPage(req, res, next) {
        res.status(200).json({data});
    },
};

module.exports = ctrl;
