import data from '../../data/skills.json';

const skills = {
    state: {
        items: data.data.skills,
    },
    getters: {
        skills(state) {
            return state.items;
        },
    },
    mutations: {
        /**
         * @param {{}} state
         * @param {{group: Object}} options
         */
        addGroup(state, options) {
            const skills = state.items.slice();
            options.group.id = Date.now();
            options.group.items = [];

            skills.push(options.group);
            state.items = skills;
        },

        /**
         * @param {Object} state
         * @param {{group: {id: String, name: String, items: Array}}} options
         */
        updateGroup(state, options) {
            console.log(2);
            const skills = state.items.slice();
            let indexGroup;
            skills.some((group, _indexGroup) => {
                if (group.id === options.group.id) {
                    indexGroup = _indexGroup;
                    return true;
                } else {
                    return false;
                }
            });

            skills.splice(indexGroup, 1, options.group);
            state.items = skills;
        },

        /**
         * @param {{}} state
         * @param {{idGroup: String}} options
         */
        removeGroup(state, options) {
            const skills = state.items.slice();
            let indexGroup;
            skills.some((group, _indexGroup) => {
                if (group.id === options.idGroup) {
                    indexGroup = _indexGroup;
                    return true;
                } else {
                    return false;
                }
            });

            skills.splice(indexGroup, 1);
            state.items = skills;
        },

        /**
         * @param {{}} state
         * @param {{idGroup: String, item: Object}} options
         */
        addItem(state, options) {
            const skills = state.items.slice();
            let indexGroup;
            skills.some((group, _indexGroup) => {
                if (group.id === options.idGroup) {
                    indexGroup = _indexGroup;
                    return true;
                } else {
                    return false;
                }
            });

            options.item.id = Date.now();

            skills[indexGroup].items.push(options.item);
            state.items = skills;
        },

        /**
         * @param {Object} state
         * @param {{id: String, name: String, value: String}} item
         */
        updateItem(state, item) {
            const skills = state.items.slice();
            let indexGroup;
            let indexItem;
            skills.some((group, _indexGroup) => {
                return group.items.some((_item, _indexItem) => {
                    if (_item.id === item.id) {
                        indexGroup = _indexGroup;
                        indexItem = _indexItem;
                        return true;
                    } else {
                        return false;
                    }
                });
            });

            skills[indexGroup].items.splice(indexItem, 1, item);
            state.items = skills;
        },

        /**
         * @param {Object} state
         * @param {{idItem: String}} options
         */
        removeItem(state, options) {
            const skills = state.items.slice();
            let indexGroup;
            let indexItem;
            skills.some((group, _indexGroup) => {
                return group.items.some((_item, _indexItem) => {
                    if (_item.id === options.idItem) {
                        indexGroup = _indexGroup;
                        indexItem = _indexItem;
                        return true;
                    } else {
                        return false;
                    }
                });
            });

            skills[indexGroup].items.splice(indexItem, 1);
            state.items = skills;
        },
    },
    actions: {
        /**
         * @param {{}} context
         * @param {{group: Object}} options
         * @return {Promise}
         */
        addGroup(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('addGroup', options);
                    resolve();
                }, 1000);
            });
        },

        /**
         * @param {{}} context
         * @param {{group: Object}} options
         * @return {Promise}
         */
        updateGroup(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(1);
                    context.commit('updateGroup', options);
                    resolve();
                }, 1000);
            });
        },

        /**
         * @param {{}} context
         * @param {{group: Object}} options
         * @return {Promise}
         */
        removeGroup(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('removeGroup', options);
                    resolve();
                }, 1000);
            });
        },

        /**
         * @param {{}} context
         * @param {{idGroup: String, item: Object}} options
         * @return {Promise}
         */
        addItem(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('addItem', options);
                    resolve();
                }, 1000);
            });
        },

        /**
         * @param {{}} context
         * @param {Object} item
         * @return {Promise}
         */
        updateItem(context, item) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('updateItem', item);
                    resolve();
                }, 1000);
            });
        },

        /**
         * @param {{}} context
         * @param {Object} item
         * @return {Promise}
         */
        removeItem(context, item) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('removeItem', item);
                    resolve();
                }, 1000);
            });
        },
    },
};

export default skills;
