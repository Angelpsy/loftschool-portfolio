const Ctrl = require('./_base');
const http = require('request');

const apiConfig = require('../../../configs/api');

const requestmenu = function() {
    return new Promise((resolve, reject) => {
        const pathApi = '/api/menu';
        const requestOptions = {
            url: apiConfig.server + pathApi,
            method: 'GET',
            json: {},
        };
        http(requestOptions, function(error, response, body) {
            resolve(body.data);
        });
    });
};

const ctrlLogin = new Ctrl({
    template: 'pages/login/index',
    title: 'Авторизация',
    templateName: 'login',
});

ctrlLogin.getPage = function(req, res, next) {
    Promise.all([
        requestmenu(),
    ])
        .then((dataArray) => {
            const data = Object.assign({}, dataArray[0]);

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
