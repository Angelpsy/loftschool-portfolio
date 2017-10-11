const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Укажите username (поле username)'],
    },
    salt: String,
    password: {
        type: String,
        required: [true, 'Укажите password (поле password)'],
        set(value) {
            this.salt = crypto.randomBytes(16).toString('hex');
            return crypto
                .pbkdf2Sync(value, this.salt, 1000, 16, 'sha512')
                .toString('hex');
        },
    },
});

/**
 * @param {String} password
 * @return {boolean}
 */
UserSchema.methods.validPassword = function(password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 16, 'sha512')
        .toString('hex');
    return this.password === hash;
};

mongoose.model('user', UserSchema);
