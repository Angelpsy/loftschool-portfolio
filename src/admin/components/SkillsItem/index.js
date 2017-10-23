const SkillsItem = {
    name: 'SkillsItem',
    data() {
        return {
            name: '',
            value: 0,
            isEdit: false,
            isSend: false,
        };
    },
    props: {
        item: {
            type: Object,
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
            return !!this.name && (!!this.value || this.value === 0);
        },
    },
    components: {
    },
    methods: {
        validatorFnValue(val) {
            return val.match(/^\d+$/) && +val <= 100 && +val >= 0;
        },
        update() {
            if (!this.isValidData || this.isSend) {
                return;
            }

            const item = Object.assign({}, this.item, {
                name: this.name,
                value: this.value,
            });

            this.isSend = true;

            this.updateItem(item)
                .then(() => {
                    this.isEdit = false;
                    this.isSend = false;
                })
                .catch(() => {
                    this.isSend = false;
                });
        },
        _remove() {
            if (this.isSend) {
                return;
            }

            this.isSend = true;

            this.removeItem({idItem: this.item.id})
                .then(() => {
                    this.isSend = false;
                })
                .catch(() => {
                    this.isSend = false;
                });
        },
        _cancelEdit() {
            this.name = this.item.name;
            this.value = this.item.value;
            this.isEdit = false;
        },
        _toggleEdit() {
            this.isEdit = !this.isEdit;
        },
    },
    created() {
        this.name = this.item.name;
        this.value = this.item.value;
    },
    watch: {
        item(val) {
            this.name = val.name;
            this.value = val.value;
        },
    },
};

export default SkillsItem;
