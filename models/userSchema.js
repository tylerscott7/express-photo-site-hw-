const mongoose = require('mongoose');
const Photos = require('./photoSchema');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pictures: [Photos.schema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;