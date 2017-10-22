import About from './components/About';
import Blog from './components/Blog';
import Works from './components/Works';

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/about',
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/blog',
        name: 'blog',
        component: Blog,
    },
    {
        path: '/works',
        name: 'works',
        component: Works,
    },
    {
        path: '*',
        name: '*',
        redirect: '/about', // TODO: реализовать компонент not found
    },
];

export default routes;
