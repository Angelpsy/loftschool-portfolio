import SkillsGroup from '../SkillsGroup';
import SkillsItem from '../SkillsItem';

const Skills = {
    name: 'Skills',
    data() {
        return {
            formNewGroupShow: false,
            newGroupName: '',
            isSend: false,
        };
    },
    props: {
        skills: {
            type: Array,
            required: true,
        },
        addGroup: {
            type: Function,
            required: true,
        },
        updateGroup: {
            type: Function,
            required: true,
        },
        removeGroup: {
            type: Function,
            required: true,
        },
        addItem: {
            type: Function,
            required: true,
        },
        updateItem: {
            type: Function,
            required: true,
        },
        removeItem: {
            type: Function,
            required: true,
        },
    },
    computed: {
        isValidData() {
            return !!this.newGroupName;
        },
    },
    components: {
        SkillsGroup,
        SkillsItem,
    },
    methods: {
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
    },
    created() {
    },
};

export default Skills;
