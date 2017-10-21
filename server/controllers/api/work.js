const mongoose = require('mongoose');

/**
 *
 */
const ctrl = {

    /**
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    getWorks(req, res, next) {
        const posts = mongoose.model('work');
        posts.find()
            .then((items) => {
                const data = {
                    works: items.map((item) => {
                        return {
                            'id': '_' + item._id,
                            'name': item.name,
                            'skills': item.skills,
                            'href': item.href,
                            'img': item.imgFile,
                        };
                    }),
                };



                if (items.length) {
                    res.status(200).json({data});
                } else {
                    res
                        .status(200)
                        .json({data: {posts: []}});
                }
            });
    },

    createWork: function(req, res) {
        const Model = mongoose.model('work');

        let item = new Model({
            name: req.body.name,
            skills: req.body.skills,
            href: req.body.href,
            imgFile: req.body.imgFile, // TODO: Реализовать загрузку файла
        });

        item.save()
            .then(() => {
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: 'Запись успешно добавлена',
                    });
            }, (err) => {

                const error = Object
                    .keys(err.errors)
                    .map((key) => err.errors[key].message)
                    .join(', ');

                res.status(500)
                    .json({
                        error: true,
                        messageError: 'При добавление записи произошла ошибка: ' + error,
                    });
            });
    },
};

module.exports = ctrl;
