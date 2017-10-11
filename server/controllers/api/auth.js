// const mongoose = require('mongoose');
const passport = require('passport');

// const UserModel = mongoose.model('user');

/**
 *
 */
const ctrl = {

    /**
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    login(req, res, next) {
        passport.authenticate('loginUsers', (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.json({
                    error: true,
                    messageError: 'Укажите правильный логин и пароль!',
                });
            }
            req
                .logIn(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    return res.json({
                        success: true,
                        message: 'Все ок, Добро пожаловать',
                    });
                });
        })(req, res, next);
    },

};

module.exports = ctrl;
