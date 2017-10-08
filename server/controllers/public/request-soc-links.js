const http = require('request');

const apiConfig = require('../../../configs/api');

const requestSocLinks = function() {
    return new Promise((resolve, reject) => {
        const pathApi = '/api/soc-links';
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

module.exports = requestSocLinks;
