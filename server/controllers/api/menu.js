const fs = require('fs');
const path = require('path');

const PATH = require('../../../configs/paths');

const menus = JSON.parse(
    fs.readFileSync(path.join(PATH.src, 'data', 'menu.json'))
)
    .data;

/**
 *
 */
const ctrlMenu = {

    /**
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    getPage(req, res, next) {
        res.status(200).json({data: menus});
    },
};

module.exports = ctrlMenu;
