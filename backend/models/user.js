const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

/* 

    Create a User Model

    *Purpose*: This is the user's model. Main purpose is to login / sign up --> access their lists and make todos

    - User models hold: 
        1: Unique ID for reference
        2: Username field
        3: Password field
        4: A list of "Lists" they've made (the List model has the Todos inside of them)
*/

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
    listsMade: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
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
