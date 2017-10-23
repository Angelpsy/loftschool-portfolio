import Vue from 'Vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import skills from './skills';
import works from './works';
import posts from './posts';

const store = new Vuex.Store({
    modules: {
        skills,
        works,
        posts,
    },
});


export default store;
