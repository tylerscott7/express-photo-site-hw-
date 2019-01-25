const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    username: { type: String, required: true },
    url: { type: String, required: true }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;