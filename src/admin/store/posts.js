import data from '../../data/posts.json';

const posts = {
    state: {
        items: data.data.posts,
    },
    getters: {
        posts(state) {
            return state.items;
        },
    },
    mutations: {
        /**
         * @param {Object} state
         * @param {{post: {id: String, name: String, text: String, date: Date}}} options
         */
        addPost(state, options) {
            const posts = state.items.slice();

            posts.push(options.post);
            state.items = posts;
        },

        /**
         * @param {Object} state
         * @param {{post: {id: String, name: String, text: String, date: Date}}} options
         */
        updatePost(state, options) {
            const posts = state.items.slice();
            let indexPost;
            posts.some((post, _indexPost) => {
                if (post.id === options.post.id) {
                    indexPost = _indexPost;
                    return true;
                } else {
                    return false;
                }
            });

            posts.splice(indexPost, 1, options.post);
            state.items = posts;
        },

        /**
         * @param {Object} state
         * @param {{id: String}} options
         */
        removePost(state, options) {
            const posts = state.items.slice();
            let indexPost;
            posts.some((post, _indexPost) => {
                if (post.id === options.id) {
                    indexPost = _indexPost;
                    return true;
                } else {
                    return false;
                }
            });

            posts.splice(indexPost, 1);
            state.items = posts;
        },
    },
    actions: {
        /**
         * @param {Object} context
         * @param {{post: {name: String, text: String, date: Date}}} options
         * @return {Promise} Promise
         */
        addPost(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    options.post.id = Date.now();
                    context.commit('addPost', options);
                    resolve();
                }, 1000);
            });
        },
        /**
         * @param {Object} context
         * @param {{post: {id: String, name: String, text: String, date: Date}}} options
         * @return {Promise} Promise
         */
        updatePost(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('updatePost', options);
                    resolve();
                }, 1000);
            });
        },
        /**
         * @param {Object} context
         * @param {{id: String}} options
         * @return {Promise} Promise
         */
        removePost(context, options) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('removePost', options);
                    resolve();
                }, 1000);
            });
        },
    },
};

export default posts;
