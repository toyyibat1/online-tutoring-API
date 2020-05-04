const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let schema = new Schema({
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    _id: { type: String, required: true },
    password: { type: String, required: true },
    join_date: { type: Date, default: Date.now },
    subjects: {
        type: [
            {
                subject: { type: String }
            }
        ],
        default: []
    }
});

schema.virtual('username').get(function() {
    return this._id;
});

module.exports = mongoose.model('Tutor', schema);
