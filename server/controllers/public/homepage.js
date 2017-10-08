const Ctrl = require('./_base');

const requestMenu = require('./request-menu');
const requestSocLinks = require('./request-soc-links');

const ctrlHome = new Ctrl({
    template: 'pages/index/index',
    title: 'Главная страница',
    templateName: 'index',
});

ctrlHome.getPage = function(req, res, next) {
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
}.bind(ctrlHome);

module.exports = ctrlHome;
