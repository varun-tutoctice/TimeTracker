const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    firstname: {type:String},
    lastname: {type:String},
    email: {type:String},
    image: {type:String},
    password: {type:String},
    lastlogin: {type:Date},
   
});

// Pre-save of user's hash password to database
AdminSchema.pre('save', function (next) {
  const admins = this,
    SALT_FACTOR = 5;

  if (!admins.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(admins.password, salt, null, (err, hash) => {
      if (err) return next(err);
      admins.password = hash;
      next();
    });
  });
});

// Method to compare password for login
AdminSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('admins', AdminSchema, 'admins');