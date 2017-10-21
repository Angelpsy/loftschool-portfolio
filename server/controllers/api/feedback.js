const nodemailer = require('nodemailer');
const config = require('../../../configs/protected/mail-config.json');

/**
 * @param {Object} options
 * @param {String=} options.name
 * @param {String=} options.email
 * @param {String} options.message
 * @return {Promise}
 */
function sendEmail(options) {
    options.email = options.email || '';
    options.name = options.name || '';
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport(config.mail.smtp);
        const mailOptions = {
            from: `"${config.mail.toUserName}" <${config.mail.toEmail}>`,
            to: config.mail.toEmail,
            subject: config.mail.subject,
            text: `Message: ${options.message}
                   \n name: ${options.name}
                   \n email: ${options.email}
                   \n Отправлено с: <${config.mail.toEmail}>`,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

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
        const name = req.query.name;
        const email = req.query.email;
        const message = req.body.message.trim();

        if (!message) {
            res.status(200).json({
                success: false,
                error: true,
                messageError: 'Необходимо ввести сообщение',
            });
        } else {
            sendEmail({name, email, message})
                .then(() => {
                    res.status(200).json({
                        success: true,
                        message: 'Сообщение отправлено',
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(200).json({
                        success: false,
                        error: true,
                        messageError: 'При отправке почты произошла ошибка',
                    });
                });
        }
    },
};

module.exports = ctrl;
