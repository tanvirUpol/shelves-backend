const mongoose = require('mongoose');

const RolesSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    hasPermission: {
        type: [String],
        default: [],
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true,
    },

});

const Role = mongoose.model('Role', RolesSchema);

module.exports = Role;
