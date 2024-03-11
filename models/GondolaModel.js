const mongoose = require('mongoose');
const { shelves_db } = require("../mongConnection");
const gondolaSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Regular",
        required: true
    },
    gondola_ID: {
        type: String,
        required: true
    },
    dc: {
        type: String,
        required: true,
    },
    floor: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },

    sub_category: {
        type: String,
        required: true,
    },
    
    isDeleted: {
        type: Boolean,
        default: false,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
        // required: true,
    },
    width: {
        type: Number,
        // required: true,
    },
    length: {
        type: Number,
        // required: true,
    }
},{timestamps:true});

const Gondola = shelves_db.model('Gondola', gondolaSchema);

module.exports = Gondola;
