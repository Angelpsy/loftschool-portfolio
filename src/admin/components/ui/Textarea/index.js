const UITextarea = {
    name: 'UITextarea',
    data() {
        return {
        };
    },
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    components: {
    },
    methods: {
        handlerChange($event) {
            this.$emit('change', $event.target.value);
        },
        handlerInput($event) {
            this.$emit('input', $event.target.value);
        },
    },
    created() {
    },
};

export default UITextarea;
