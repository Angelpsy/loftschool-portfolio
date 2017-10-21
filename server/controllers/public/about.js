const Ctrl = require('./_base');
const http = require('request');

const apiConfig = require('../../../configs/api');

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
    requests: [requestSkills, requestContacts],
});

module.exports = ctrlAbout;

