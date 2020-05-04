const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    type: {type:String, required: true}, //lesson type
    username: {type:String, required: true},
    time: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Lesson', SubjectSchema)





