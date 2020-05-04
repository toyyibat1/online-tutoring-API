const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    code: {type:String, required: true},
    name: {type:String, required: true},
    description: {type: String},
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
});

module.exports = mongoose.model('Subject', SubjectSchema)




