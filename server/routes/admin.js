const express = require('express');
const router = express.Router();

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res
        .status(401)
        .send('Авторизируйтесь');
}

router.get('/', isLoggedIn, (req, res) => {
    res
        .status(200)
        .send('Админка');
});

module.exports = router;
