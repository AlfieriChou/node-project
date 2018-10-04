import bcrypt from'bcryptjs';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, select: true }
});

userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

export default mongoose.model('User', userSchema);