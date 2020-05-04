const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
    username: {
        type: String,
        required: true
        },
        email: {
        type: String,
        required: true,
        trim: true
        },
        password: {
        type: String,
        required: true
        },
        roles: [{
            type: Schema.Types.ObjectId,
            ref: "Role"
        }],
        accessToken:{
            type:String
        }    
});
module.exports = mongoose.model('User', userSchema);
