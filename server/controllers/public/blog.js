const Ctrl = require('./_base');
const http = require('request');

const apiConfig = require('../../../configs/api');

const requestPosts = function() {
    return new Promise((resolve, reject) => {
        const pathApi = '/api/posts';
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

const ctrlBlog = new Ctrl({
    template: 'pages/blog/index',
    title: 'Блог',
    templateName: 'blog',
    requests: [requestPosts],
});

module.exports = ctrlBlog;

