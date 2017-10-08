const Ctrl = require('./_base');
const http = require('request');

const apiConfig = require('../../../configs/api');

const requestMenu = require('./request-menu');
const requestSocLinks = require('./request-soc-links');

const requestSkills = function() {
    return new Promise((resolve, reject) => {
        const pathApi = '/api/skills';
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

const requestContacts = function() {
    return new Promise((resolve, reject) => {
        const pathApi = '/api/contacts';
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

const ctrlAbout = new Ctrl({
    template: 'pages/about/index',
    title: 'Страница обо мне',
    templateName: 'about',
});

ctrlAbout.getPage = function(req, res, next) {
    Promise.all([
        requestMenu(),
        requestSocLinks(),
        requestSkills(),
        requestContacts(),
    ])
        .then((dataArray) => {
            const data = Object.assign({},
                dataArray[0],
                dataArray[1],
                dataArray[2],
                dataArray[3]
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
}.bind(ctrlAbout);

module.exports = ctrlAbout;

