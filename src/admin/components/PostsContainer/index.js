import PostsPresent from '../PostsPresent';

import {mapGetters, mapActions} from 'vuex';

const PostsContainer = {
    name: 'PostsContainer',
    data() {
        return {
        };
    },
    computed: Object.assign(mapGetters([
        'posts',
    ]), {
    }),
    components: {
        PostsPresent,
    },
    methods: Object.assign({}, mapActions([
        'addPost',
        'updatePost',
        'removePost',
    ]), {
    }),
    created() {
    },
};

export default PostsContainer;
