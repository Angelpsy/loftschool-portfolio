const mongoose = require('mongoose');

/**
 * @param {String} id
 * @param {Object} data
 * @return {Promise}
 * @private
 */
function _updateGroup(id, data) {
    return new Promise((resolve, reject) => {
        const Model = mongoose.model('skills-group');

        Model.findByIdAndUpdate(id, {$set: data} )
            .then((data) => {
                if (data._id || data.length) {
                    resolve(data);
                } else {
                    reject('Нет Group с id: ' + id);
                }
            })
            .catch((err) => {
                reject('Ошибка при обновлении Group: ' + err);
            });
    });

}

/**
 * @param {String} id
 * @return {Promise}
 * @private
 */
function _getGroup(id) {
    const Model = mongoose.model('skills-group');
    return Model.findById(id);
}

/**
 * @param {String} id
 * @return {Promise}
 * @private
 */
function _getItem(id) {
    return new Promise((resolve, reject) => {
        const Model = mongoose.model('skill-item');

        return Model.findById(id)
            .then((data) => {
                let _data;
                if (Array.isArray(data)) {
                    _data = data[0];
                } else {
                    _data = data;
                }
                resolve(_data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 * @param {String} id
 * @return {Promise}
 * @private
 */
function _removeItem(id) {
    return new Promise((resolve, reject) => {
        const ModelItem = mongoose.model('skill-item');

        return ModelItem.findByIdAndRemove(id)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 *
 */
const ctrl = {

    /**
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    getSkills(req, res, next) {
        const skills = mongoose.model('skills-group');
        skills.find()
            .then((skillsGroups) => {
                const promises = skillsGroups.map((skillsGroup) => {
                    return new Promise((resolve, reject) => {
                        Promise.all(skillsGroup.skillItems.map((idItem) => {
                            return _getItem(idItem);
                        }))
                            .then((items) => {
                                // console.log(items);
                                const _group = {
                                    id: skillsGroup._id,
                                    name: skillsGroup.name,
                                    items: items.map((item) => {
                                        return {
                                            id: item._id,
                                            name: item.name,
                                            value: item.value,
                                        };
                                    }),
                                };

                                resolve(_group);
                            });
                    });
                });
                return Promise.all(promises);
            })
            .then((skills) => {
                const data = {
                    skills,
                };

                if (skills.length) {
                    res.status(200).json({data});
                } else {
                    res
                        .status(200)
                        .json({data: {skills: []}});
                }
            });

        // res.status(200).json({data});
    },

    createGroup: function(req, res) {
        const ModelGroup = mongoose.model('skills-group');
        let group = new ModelGroup({
            name: req.body.name,
            skillItems: [],
        });

        group.save()
            .then((item) => {
                return res
                    .status(200)
                    .json({status: 'Запись успешно добавлена'});
            }, (err) => {
                // если есть ошибки, то получаем их список и так же передаем
                const error = Object
                    .keys(err.errors)
                    .map((key) => err.errors[key].message)
                    .join(', ');

                // обрабатываем  и отправляем
                res
                    .status(500)
                    .json({
                        status: 'При добавление записи произошла ошибка: ' + error,
                    });
            });
    },

    createItem: function(req, res) {
        if (!req.body.idGroup) {
            return res
                .status(200)
                .json({
                    status: 'Необходимо idGroup',
                });
        }

        const Modelitem = mongoose.model('skill-item');
        let item = new Modelitem({
            name: req.body.name,
            value: req.body.value,
        });

        item.save()
            .then((item) => {
                return new Promise((resolve, reject) => {
                    _getGroup(req.body.idGroup)
                        .then((group) => {
                            if (!group) {
                                _removeItem(item.id)
                                    .then(() => {
                                        reject(`Skills Group с id: ${req.body.idGroup} не найден`);
                                    })
                                    .catch((err) => {
                                        reject(err);
                                    });
                            }
                            resolve({item, skillItems: group.skillItems || []});
                        })
                        .catch((err) => {
                            _removeItem(item.id)
                                .then(() => {
                                    reject(err);
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        });
                });
            })
            .then((data) => {
                return new Promise((resolve, reject) => {
                    const _data = {
                        skillItems: data.skillItems,
                    };

                    data.skillItems.push(data.item.id);
                    _updateGroup(req.body.idGroup, _data)
                        .then((dataGroup) => {
                            if (!dataGroup) {
                                _removeItem(data.item.id);
                                reject('Не удалось обновить skills Group');
                            } else {
                                resolve();
                            }
                        })
                        .catch((err) => {
                            _removeItem(data.item.id)
                                .then(() => {
                                    reject(err);
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        });
                });
            })
            .then(() => {
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: 'Запись успешно добавлена',
                    });
            })
            .catch((err) => {
                if (!err.errors) {
                    return res
                        .status(200)
                        .json({
                            error: true,
                            messageError: 'При добавление записи произошла ошибка: ' + err,
                        });
                } else {
                    const error = Object
                        .keys(err.errors)
                        .map((key) => err.errors[key].message)
                        .join(', ');

                    return res
                        .status(500)
                        .json({
                            error: true,
                            messageError: 'При добавление записи произошла ошибка: ' + error,
                        });
                }
            });
    },
};

module.exports = ctrl;
