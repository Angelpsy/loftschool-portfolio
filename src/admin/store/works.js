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
    mutations: {},
    actions: {},
};

export default works;
