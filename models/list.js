const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title:      { type: String, required: true },
    description:{ type: String },
    // comment: []
    // rating:     { type: Number }
    }
    }
});

module.exports = mongoose.model('List', ListSchema);