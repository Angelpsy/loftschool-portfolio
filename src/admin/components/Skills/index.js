import SkillsGroup from '../SkillsGroup';
import SkillsItem from '../SkillsItem';

import {mapGetters, mapActions} from 'vuex';

const Skills = {
    name: 'Skills',
    data() {
        return {
            formNewGroupShow: false,
            newGroupName: '',
            isSend: false,
        };
    },
    computed: Object.assign(mapGetters([
        'skills',
    ]), {
        isValidData() {
            return !!this.newGroupName;
        },
    }),
    components: {
        SkillsGroup,
        SkillsItem,
    },
    methods: Object.assign(mapActions([
        'addGroup',
        'updateGroup',
        'removeGroup',
        'addItem',
        'updateItem',
        'removeItem',
    ]), {
        _open() {
            this.formNewGroupShow = true;
        },
        _close() {
            this.formNewGroupShow = false;
        },
        _clear() {
            this.newGroupName = '';
        },
        _addGroup(name) {
            if (!this.isValidData || this.isSend) {
                return;
            }
            const group = {
                name,
            };

            this.isSend = true;
            this.addGroup({group})
                .then(() => {
                    this._clear();
                    this.isSend = false;
                })
                .catch(() => {
                    this.isSend = false;
                });
        },
    }),
    created() {
    },
};

export default Skills;
