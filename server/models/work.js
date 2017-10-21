const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WorkSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Укажите заголовок работы (поле name)'],
    },
    skills: {
        type: String,
        required: [true, 'Укажите технологии (поле skills)'],
    },
    href: {
        type: String,
        required: [true, 'Укажите ссылку (поле href)'],
    },
    // TODO: Реализовать загрузку файла
    imgFile: {
        type: String,
        required: [true, 'Укажите файл (пусть до файла) (поле imgFile)'],
    },
});

mongoose.model('work', WorkSchema);
