const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
        title: {
            type: String,
            required: [true, 'Укажите заголовок статьи (поле title)'],
        },
        text: {
            type: String,
            required: [true, 'Укажите содержимое статьи (поле text)'],
        },
        date: {
            type: Date,
            default: Date.now,
            required: [true, 'Укажите дату публикации (поле date)'],
        },
    });

// просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('post', PostSchema);
