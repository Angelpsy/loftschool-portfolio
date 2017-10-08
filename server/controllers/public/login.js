const Ctrl = require('./_base');

const requestMenu = require('./request-menu');
const requestSocLinks = require('./request-soc-links');

const ctrlLogin = new Ctrl({
    template: 'pages/login/index',
    title: 'Авторизация',
    templateName: 'login',
});

ctrlLogin.getPage = function(req, res, next) {
    Promise.all([
        requestMenu(),
        requestSocLinks(),
    ])
        .then((dataArray) => {
            const data = Object.assign({},
                dataArray[0],
                dataArray[1]
            );

            res.render(this.template, Object.assign(
                {
                    title: this.title,
                    staticManifest: this.staticManifest,
                    templateName: this.templateName,
                    criticalPrefix: this.criticalPrefix,
                },
                {
                    data,
                }
            ));
        });
}.bind(ctrlLogin);

module.exports = ctrlLogin;
