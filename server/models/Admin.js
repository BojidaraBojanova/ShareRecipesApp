const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

adminSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10);
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;