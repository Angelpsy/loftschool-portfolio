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
    mutations: {},
    actions: {},
};

export default posts;
