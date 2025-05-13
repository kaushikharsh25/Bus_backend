const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    studentId: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
    },
    age: {
        type: Number,
        min: 5,
        max: 100,
    },
    socketId: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'captain'],
        default: 'user',  // Default role is user
    },
    ticketHistory: [
        {
            ticketId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ticket'
            },
            bookedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { 
            _id: this._id, 
            email: this.email, 
            fullname: this.fullname,
            role: this.role  // Include role in the token
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
    );
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
