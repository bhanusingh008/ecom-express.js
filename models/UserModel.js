const mongoose = require('mongoose');

const user_model = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    type:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', user_model);