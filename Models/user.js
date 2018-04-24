'use-strict'

import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  email: {type: String, unique: true, lowercase: true},
  password: {type: String, required: true},
  signUpDate: {type: Date, default: Date.now()},
  lastLogin: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.pre('save', function(next){
  let user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err,salt) =>{
    if(err) return next(err);

    bcrypt.hash(user.password,salt,null,(err,hash) =>{
          if(err) return next(err);

          user.password = hash;
          next();
    });
  });

});


userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, (err,result) =>{
    //console.log(candidatePassword +' '+ this.password);

    if(err) return callback(err);
    /* encontro la password */
      callback(null,result);
  });
}


module.exports = mongoose.model('user', userSchema);
