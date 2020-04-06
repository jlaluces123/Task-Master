const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Pre is a middleware from mongoose that acts as a middleware and is triggered before we save the document in this case
userSchema.pre('save', function (next) {
    let user = this;

    // Hash the password if it has been modified or created a new one
    if (!user.isModified('password')) return next();

    // Generate salt from bcrypt js
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // Hash password with salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // Take plain text password and hash it
            user.password = hash;
            next();
        }); // hash()
    }); // genSalt()
}); // pre()

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
