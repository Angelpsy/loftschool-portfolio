const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SkillGroupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Укажите заголовок группы умений (поле name)'],
    },
    skillItems: {
        type: Array,
        required: [false, 'Укажите элементы группы (поле skillItems)'],
    },
});

mongoose.model('skills-group', SkillGroupSchema);
