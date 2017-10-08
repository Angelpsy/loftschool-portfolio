const Ctrl = require('./_base');
const http = require('request');

const apiConfig = require('../../../configs/api');

const requestMenu = require('./request-menu');
const requestSocLinks = require('./request-soc-links');

const requestWorks = function() {
    return new Promise((resolve, reject) => {
        const pathApi = '/api/works';
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

const requestReviews = function() {
    return new Promise((resolve, reject) => {
        const pathApi = '/api/reviews';
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

const ctrlWorks = new Ctrl({
    template: 'pages/works/index',
    title: 'Работы',
    templateName: 'works',
    requests: [requestWorks, requestReviews],
});

module.exports = ctrlWorks;


