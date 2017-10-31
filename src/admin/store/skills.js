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
        addSkillsGroup(state, options) {
            const skills = state.items.slice();

            skills.push(options.group);
            state.items = skills;
        },

        /**
         * @param {Object} state
         * @param {{group: {id: String, name: String, items: Array}}} options
         */
        updateSkillsGroup(state, options) {
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
        removeSkillsGroup(state, options) {
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
        addSkillsItem(state, options) {
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

            skills[indexGroup].items.push(options.item);
            state.items = skills;
        },

        /**
         * @param {Object} state
         * @param {{id: String, name: String, value: String}} item
         */
        updateSkillsItem(state, item) {
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
        removeSkillsItem(state, options) {
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
        addSkillsGroup(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    options.group.id = Date.now();
                    options.group.items = [];
                    context.commit('addSkillsGroup', options);
                    resolve();
                }, 1000);
            });
        },

        /**
         * @param {{}} context
         * @param {{group: Object}} options
         * @return {Promise}
         */
        updateSkillsGroup(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('updateSkillsGroup', options);
                    resolve();
                }, 1000);
            });
        },

        /**
         * @param {{}} context
         * @param {{group: Object}} options
         * @return {Promise}
         */
        removeSkillsGroup(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('removeSkillsGroup', options);
                    resolve();
                }, 1000);
            });
        },

        /**
         * @param {{}} context
         * @param {{idGroup: String, item: Object}} options
         * @return {Promise}
         */
        addSkillsItem(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    options.item.id = Date.now();
                    context.commit('addSkillsItem', options);
                    resolve();
                }, 1000);
            });
        },

        /**
         * @param {{}} context
         * @param {Object} item
         * @return {Promise}
         */
        updateSkillsItem(context, item) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('updateSkillsItem', item);
                    resolve();
                }, 1000);
            });
        },

        /**
         * @param {{}} context
         * @param {Object} item
         * @return {Promise}
         */
        removeSkillsItem(context, item) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('removeSkillsItem', item);
                    resolve();
                }, 1000);
            });
        },
    },
};

export default skills;
