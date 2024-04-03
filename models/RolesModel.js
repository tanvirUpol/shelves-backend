const mongoose = require('mongoose');
const { shelves_db } = require("../mongConnection");

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

const Role = shelves_db.model('Role', RolesSchema);

module.exports = Role;
