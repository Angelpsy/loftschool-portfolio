const Ctrl = require('./_base');
const http = require('request');

const apiConfig = require('../../../configs/api');

const requestMenu = require('./request-menu');
const requestSocLinks = require('./request-soc-links');

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
});

ctrlBlog.getPage = function(req, res, next) {
    Promise.all([
        requestMenu(),
        requestSocLinks(),
        requestPosts(),
    ])
        .then((dataArray) => {
            const data = Object.assign({},
                dataArray[0],
                dataArray[1],
                dataArray[2]
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
}.bind(ctrlBlog);

module.exports = ctrlBlog;

