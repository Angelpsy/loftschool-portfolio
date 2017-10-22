const Nav = {
    name: 'Nav',
    data() {
        return {
            links: [
                {
                    id: 'about',
                    hrefName: 'about',
                    text: 'Обо мне',
                },
                {
                    id: 'blog',
                    hrefName: 'blog',
                    text: 'Блог',
                },
                {
                    id: 'works',
                    hrefName: 'works',
                    text: 'Мои работы',
                },
            ],
        };
    },
    props: {
    },
    components: {
    },
    methods: {
    },
    created() {
    },
};

export default Nav;
