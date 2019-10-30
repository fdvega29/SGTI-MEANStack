const mongoose = require('mongoose');
const { Schema } = mongoose.Schema();

const adminSchema = new Schema({

    user: {type: String, required: true},
    password: { type: String, required: true}
    
});

module.exports = mongoose.model('Admin', adminSchema);