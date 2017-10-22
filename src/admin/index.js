import Vue from 'Vue';
import VueRouter from 'vue-router';

import App from './App';
import AppButton from './components/ui/Button';
import AppInput from './components/ui/Input';
import AppTextarea from './components/ui/Textarea';

import routes from './routes';

const router = new VueRouter({routes});

Vue.use(VueRouter);

// registration of global components
Vue.component('ui-button', AppButton);
Vue.component('ui-input', AppInput);
Vue.component('ui-textarea', AppTextarea);

new Vue({
    el: '#root',
    router,
    template: '<App />',
    components: {
        App,
    },
});
