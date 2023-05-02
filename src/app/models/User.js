const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const User = new Schema (
    {
        userId:     { type: String, require: true, },
        name:       { type: String, require: true, },  
        userName:   { type: String, require: true, }, 
        password:   { type: String, require: true, }, 
        login:      { type: Boolean, require: true, }, 
    },
    {
        timestamps: true,
    },
);
User.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', User);
