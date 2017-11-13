const WorksPresent = {
    name: 'WorksPresent',
    data() {
        return {
            isFormShow: false,
            itemSelected: null,
            idItemSelected: null,
            nameItemSelected: '',
            skillsItemSelected: '',
            imgItemSelected: '',
            isSend: false,
        };
    },
    props: {
        works: {
            type: Array,
            required: true,
        },
        addWork: {
            type: Function,
            required: true,
        },
        updateWork: {
            type: Function,
            required: true,
        },
        removeWork: {
            type: Function,
            required: true,
        },
    },
    computed: {
        ifFormValid() {
            return this.nameItemSelected && this.skillsItemSelected && this.imgItemSelected;
        },
    },
    components: {
    },
    methods: {
        _selectItem(item) {
            this.itemSelected = item;
            this.idItemSelected = item.id;
            this.nameItemSelected = item.name;
            this.skillsItemSelected = item.skills;
            this.imgItemSelected = item.img;
            this.isFormShow = true;
        },
        _openForm() {
            this._setDefaultItem();
            this.isFormShow = true;
        },
        _updateItem() {
            if (this.isSend) {
                return;
            }
            this.isSend = true;

            if (this.idItemSelected) {
                const work = Object.assign({}, this.itemSelected, {
                    name: this.nameItemSelected,
                    skills: this.skillsItemSelected,
                    img: this.imgItemSelected,
                });

                this.updateWork({work})
                    .then(() => {
                        this._resetForm();
                        this.isSend = false;
                    })
                    .catch(() => {
                        this.isSend = false;
                    });
            } else {
                const work = {};
                work.name = this.nameItemSelected;
                work.skills = this.skillsItemSelected;
                work.img = this.imgItemSelected;
                this.addWork({work})
                    .then(() => {
                        this._resetForm();
                        this.isSend = false;
                    })
                    .catch(() => {
                        this.isSend = false;
                    });
            }
        },
        _removeItem() {
            if (this.isSend) {
                return;
            }
            this.isSend = true;
            this.removeWork({id: this.idItemSelected})
                .then(() => {
                    this._resetForm();
                    this.isSend = false;
                    this.isFormShow = false;
                })
                .catch(() => {
                    this.isSend = false;
                });
        },
        _resetForm() {
            this._setDefaultItem();
        },
        _setDefaultItem() {
            this.itemSelected = null;
            this.idItemSelected = '';
            this.nameItemSelected = '';
            this.skillsItemSelected = '';
            this.imgItemSelected = '';
        },
    },
    created() {
        this._setDefaultItem();
    },
};

export default WorksPresent;
