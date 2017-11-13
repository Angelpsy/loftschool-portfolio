import data from '../../data/works.json';

const works = {
    state: {
        items: data.data.works,
    },
    getters: {
        works(state) {
            return state.items;
        },
    },
    mutations: {
        /**
         * @param {Object} state
         * @param {{work: {id: String, name: String, spec: String, img: String}}} options
         */
        addWork(state, options) {
            const works = state.items.slice();

            works.push(options.work);
            state.items = works;
        },

        /**
         * @param {Object} state
         * @param {{work: {id: String, name: String, skills: String, img: String}}} options
         */
        updateWork(state, options) {
            const works = state.items.slice();
            let indexWork;
            works.some((work, _indexWork) => {
                if (work.id === options.work.id) {
                    indexWork = _indexWork;
                    return true;
                } else {
                    return false;
                }
            });

            works.splice(indexWork, 1, options.work);
            state.items = works;
        },

        /**
         * @param {Object} state
         * @param {{id: String}} options
         */
        removeWork(state, options) {
            const works = state.items.slice();
            let indexWork;
            works.some((work, _indexPostWork) => {
                if (work.id === options.id) {
                    indexWork = _indexPostWork;
                    return true;
                } else {
                    return false;
                }
            });

            works.splice(indexWork, 1);
            state.items = works;
        },
    },
    actions: {
        /**
         * @param {Object} context
         * @param {{work: {name: String, skills: String, img: String}}} options
         * @return {Promise}
         */
        addWork(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    options.work.id = Date.now();
                    context.commit('addWork', options);
                    resolve();
                }, 1000);
            });
        },
        /**
         * @param {Object} context
         * @param {{work: {id: String, name: String, skills: String, img: String}}} options
         * @return {Promise}
         */
        updateWork(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('updateWork', options);
                    resolve();
                }, 1000);
            });
        },
        /**
         * @param {Object} context
         * @param {{id: String}} options
         * @return {Promise}
         */
        removeWork(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('removeWork', options);
                    resolve();
                }, 1000);
            });
        },
    },
};

export default works;
