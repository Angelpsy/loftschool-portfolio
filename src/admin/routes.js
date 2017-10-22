import About from './components/About';
import Blog from './components/Blog';
import Works from './components/Works';

const routes = [
    {
        path: '/',
        name: 'home',
        component: About,
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
        component: About, // TODO: реализовать компонент not found
    },
];

export default routes;
