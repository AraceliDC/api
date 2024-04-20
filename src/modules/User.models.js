const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true}
},
{
    timestamps: true,
}
)

userSchema.methods.hashPassword = function(userPassword){
    this.password = bcrypt.hashSync(userPassword, 16)
}

userSchema.methods.generateJWT = function(){
    return jwt.sign({ userId: this._id }, secret)
}

const User = mongoose.model('User', userSchema);

module.exports = User
