const SkillsGroup = {
    name: 'SkillsGroup',
    data() {
        return {
            formGroupShow: false,
            formNewItemShow: false,
            groupName: '',
            newItemName: '',
            newItemValue: 0,
            isSend: false,
        };
    },
    props: {
        group: {
            type: Object,
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
    },
    computed: {
        isValidFormNewItem() {
            return !!this.newItemName && (!!this.newItemValue || this.newItemValue === 0);
        },
        isValidFormEditGroup() {
            return !!this.groupName;
        },
    },
    components: {
    },
    methods: {
        validatorFnValue(val) {
            return val.match(/^\d+$/) && +val <= 100 && +val >= 0;
        },
        _addItem() {
            if (!this.isValidFormNewItem || this.isSend) {
                return;
            }

            const item = {
                name: this.newItemName,
                value: this.newItemValue,
            };

            this.isSend = true;
            this.addItem({idGroup: this.group.id, item})
                .then(() => {
                    this._clearFormNewItem();
                    this.isSend = false;
                })
                .catch(() => {
                    this.isSend = false;
                });
        },
        _removeItem() {
            if (this.isSend) {
                return;
            }

            this.isSend = true;
            this.removeGroup({idGroup: this.group.id})
                .then(() => {
                    this.isSend = false;
                })
                .catch(() => {
                    this.isSend = false;
                });
        },
        _openFormNewItem() {
            this.formNewItemShow = true;
        },
        _closeFormNewItem() {
            this.formNewItemShow = false;
        },
        _clearFormNewItem() {
            this.newItemName = '';
            this.newItemValue = 0;
        },
        _openFormEditGroup() {
            this.formGroupShow = true;
        },
        _closeFormEditGroup() {
            this.formGroupShow = false;
        },
        _clearFormEditGroup() {
            this.groupName = this.group.name;
        },
        _updateGroup() {
            if (!this.isValidFormEditGroup || this.isSend) {
                return;
            }

            const group = Object.assign({}, this.group, {
                name: this.groupName,
            });

            this.isSend = true;
            this.updateGroup({group})
                .then(() => {
                    this._closeFormEditGroup();
                    this.isSend = false;
                })
                .catch(() => {
                    this.isSend = false;
                });
        },
    },
    created() {
        this.groupName = this.group.name;
    },
    watch: {
        group(val) {
            this.groupName = val.name;
        },
    },
};

export default SkillsGroup;
