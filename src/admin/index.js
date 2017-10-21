import Vue from 'Vue';
import VueRouter from 'vue-router';

import routes from './routes';

import App from './App';

const router = new VueRouter({routes});

Vue.use(VueRouter);

new Vue({
    el: '#root',
    router,
    template: '<App />',
    components: {
        App,
    },
});
