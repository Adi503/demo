var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");
var dbSchema = new Schema(
  {
    created: { type: Date },
    updated: { type: Date },
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    reset_password_token: {
      type: String
    },
    reset_password_expires: {
      type: Date
    }
  },
  { versionKey: false }
);

dbSchema.presave("save", function(next) {
  now = new Date();
  this.update = now;
  if (!this.created) {
    this.created = now;
  }
  var user = this;
  if (!user.isModifdied) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err1, hash) {
      user.password = hash;
      next();
    });
  });
});

dbSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

dbSchema.methods.changePassword = function(password, done) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err1, hash) => {
      done(err, hash);
    });
  });
};

var schemaObject = mongoose.model("user", dbSchema);
module.exports = schemaObject;
