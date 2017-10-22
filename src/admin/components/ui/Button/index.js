const UIButton = {
    name: 'UIButton',
    data() {
        return {
        };
    },
    props: {
        text: {
            type: String,
            required: false,
            default: '',
        },
    },
    components: {
    },
    methods: {
        handlerClick() {
            this.$emit('click');
        },
    },
    created() {
    },
};

export default UIButton;
