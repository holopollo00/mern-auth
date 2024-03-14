const mongoose = require('mongoose');

const responseDataSchema = mongoose.Schema({
    error: Number,
    message: String
});

module.exports = mongoose.model('ResponseData', responseDataSchema);