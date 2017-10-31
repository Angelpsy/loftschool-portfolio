const UIInput = {
    name: 'UIInput',
    data() {
        return {
        };
    },
    props: {
        value: {
            type: [String, Number, Date],
            required: true,
        },
        validatorFn: {
            type: Function,
            required: false,
        },
    },
    components: {
    },
    methods: {
        handlerChange($event) {
            const val = $event.target.value;
            if (typeof this.validatorFn === 'function' && !this.validatorFn(val)) {
                return;
            }
            this.$emit('change', val);
        },
        handlerInput($event) {
            const val = $event.target.value;
            if (typeof this.validatorFn === 'function' && !this.validatorFn(val)) {
                $event.target.value = this.value;
                return;
            }
            this.$emit('input', val);
        },
    },
    created() {
    },
};

export default UIInput;
