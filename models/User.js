const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    email:{
        type:String, required: [true,'Please add an email'],
        unique: true,
       
    },
    role: {
        type:String,
        enum: ['user','admin'],
        default: 'user'
    },
    password: {
        type:String,
        required:[true,'Please add a password'],
        minlength: 6,
        select:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//encrypt
UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

//Sign JWT and Return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE})
}

//Match user entered password to hashed password in DB
UserSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

module.exports = mongoose.model('User',UserSchema);