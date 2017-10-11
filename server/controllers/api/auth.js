const passport = require('passport');

/**
 *
 */
const ctrl = {

    /**
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @return {*}
     */
    login(req, res, next) {
        if (req.body.isHuman !== 'on' || req.body.isNorobot.lastIndexOf('-yes') === -1 ) {
            return res.json({
                error: true,
                messageError: 'Только для людей',
            });
        } else {
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
        }
    },

};

module.exports = ctrl;
