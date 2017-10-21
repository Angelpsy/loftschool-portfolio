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
    getPosts(req, res, next) {
        const posts = mongoose.model('post');
        posts.find()
            .then((items) => {
                const data = {
                    posts: items.map((item) => {
                        return {
                            'id': '_' + item._id,
                            'name': item.title,
                            'date': item.date,
                            'text': item.text,
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

    createPost: function(req, res) {
        const Model = mongoose.model('post');

        let item = new Model({
            title: req.body.title,
            date: Date.now(),
            text: req.body.text,
        });

        item.save()
            .then((item) => {
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

                res
                    .status(500)
                    .json({
                        error: true,
                        messageError: 'При добавление записи произошла ошибка: ' + error,
                    });
            });
    },
};

module.exports = ctrl;
