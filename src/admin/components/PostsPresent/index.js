import Datepicker from 'vuejs-datepicker';

const PostsPresent = {
    name: 'PostsPresent',
    data() {
        return {
            isFormShow: false,
            itemSelected: null,
            nameItemSelected: '',
            textItemSelected: '',
            dateItemSelected: null,
            idItemSelected: null,
            isSend: false,
        };
    },
    props: {
        posts: {
            type: Array,
            required: true,
        },
        addPost: {
            type: Function,
            required: true,
        },
        updatePost: {
            type: Function,
            required: true,
        },
        removePost: {
            type: Function,
            required: true,
        },
    },
    computed: {
        // TODO: реализовать валидацию формы
        isNewItem() {
            return this.selected && !this.selected.id;
        },
        formatedDate: {
            get() {
                const date = this.dateItemSelected;
                const number = date.getDate() > 9 ? +date.getDate() : '0' + +date.getDate();
                const month = date.getMonth() >= 9 ? +date.getMonth() + 1 : '0' + (date.getMonth() + 1);
                return `${date.getFullYear()}-${month}-${number}`;
            },
            set(newValue) {
                this.dateItemSelected = new Date(newValue);
            },
        },
    },
    components: {
        Datepicker,
    },
    methods: {
        _selectItem(item) {
            this.itemSelected = item;
            this.nameItemSelected = item.name;
            this.textItemSelected = item.text;
            this.dateItemSelected = new Date(item.date);
            this.idItemSelected = item.id;
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
                const post = Object.assign({}, this.itemSelected, {
                    name: this.nameItemSelected,
                    date: this.dateItemSelected,
                    text: this.textItemSelected,
                });

                this.updatePost({post})
                    .then(() => {
                        this._resetForm();
                        this.isSend = false;
                    })
                    .catch(() => {
                        this.isSend = false;
                    });
            } else {
                const post = {};
                post.name = this.nameItemSelected;
                post.date = this.dateItemSelected;
                post.text = this.textItemSelected;
                this.addPost({post})
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
            this.removePost({id: this.idItemSelected})
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
            this.nameItemSelected = '';
            this.textItemSelected = '';
            this.dateItemSelected = new Date();
            this.idItemSelected = null;
        },
        changedMonth() {
            event.preventDefault();
        },
        selectedDate(val) {
            this.dateItemSelected = val;
        },
    },
    created() {
        this._setDefaultItem();
    },
};

export default PostsPresent;
