const mongoose = require('mongoose');

PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String
});

module.exports = mongoose.model('Posts',PostSchema);