const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SkillItemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Укажите имя технологии (поле name)'],
    },
    value: {
        type: Number,
        required: [true, 'Укажите значение (поле value)'],
    },
});

mongoose.model('skill-item', SkillItemSchema);
