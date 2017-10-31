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
        'addSkillsGroup',
        'updateSkillsGroup',
        'removeSkillsGroup',
        'addSkillsItem',
        'updateSkillsItem',
        'removeSkillsItem',
    ]), {}),
    created() {
    },
};

export default SkillsContainer;
