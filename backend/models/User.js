const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    roleID: { type: String, required: true },
    email: { type: String, required: true },
    accountStatus: { type: Boolean, required: true },
    password: { type: String, required: true },
    fullName: { type: String}
});

module.exports = mongoose.model('User', userSchema);