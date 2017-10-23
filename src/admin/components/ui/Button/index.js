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
        mod: {
            type: [String, Array],
            required: false,
        },
    },
    computed: {
        classes() {
            if (!this.mod) {
                return;
            }

            if (typeof this.mod === 'string') {
                return 'ui-button--' + this.mod;
            }

            if (Array.isArray(this.mod)) {
                return this.mod.map((mod) => {
                    return 'ui-button--' + mod;
                }).join(' ');
            }
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
