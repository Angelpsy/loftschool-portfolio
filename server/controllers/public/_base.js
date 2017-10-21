const staticManifest = require('../../staticManifest.js');
const PATHS = require('../../../configs/paths');

const requestMenu = require('./request-menu');
const requestSocLinks = require('./request-soc-links');

/**
 *
 */
class Ctrl {
    /**
     * @param {Object} options
     * @param {String} options.template
     * @param {String} options.title
     * @param {String} options.templateName
     * @param {Array=} options.requests
     */
    constructor(options) {
        this.template = options.template;
        this.title = options.title;
        this.templateName = options.templateName;
        this.requests = options.requests || [];

        this.staticManifest = staticManifest;
        this.criticalPrefix = PATHS.criticalPrefix;

        this.getPage = this.getPage.bind(this);

        this.requests = [requestMenu, requestSocLinks].concat(this.requests);
    }

    /**
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    getPage(req, res, next) {
        const promises = this.requests.map((request) => {
            return request();
        });
        Promise.all(promises)
            .then((dataArray) => {
                let data = {};
                dataArray.forEach((dataObj) => {
                    data = Object.assign(data, dataObj);
                });

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
    }
}

module.exports = Ctrl;
