import WorksPresent from '../WorksPresent';

import {mapGetters, mapActions} from 'vuex';

const WorksContainer = {
    name: 'WorksContainer',
    data() {
        return {
        };
    },
    props: {
    },
    computed: Object.assign(mapGetters([
        'works',
    ]), {
    }),
    components: {
        WorksPresent,
    },
    methods: Object.assign({}, mapActions([
        'addWork',
        'updateWork',
        'removeWork',
    ]), {
    }),
    created() {
    },
};

export default WorksContainer;
