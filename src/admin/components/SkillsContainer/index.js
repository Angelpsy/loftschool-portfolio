import SkillsPresent from '../SkillsPresent';

import {mapGetters, mapActions} from 'vuex';

const SkillsContainer = {
    name: 'SkillsContainer',
    data() {
        return {
        };
    },
    computed: Object.assign(mapGetters([
        'skills',
    ]), {
    }),
    components: {
        SkillsPresent,
    },
    methods: Object.assign(mapActions([
        'addGroup',
        'updateGroup',
        'removeGroup',
        'addItem',
        'updateItem',
        'removeItem',
    ]), {}),
    created() {
    },
};

export default SkillsContainer;
