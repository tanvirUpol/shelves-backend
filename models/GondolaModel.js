const mongoose = require('mongoose');

const gondolaSchema = new mongoose.Schema({
    // bins:[
    //     {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Bin',
    //     }
    // ],
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
});

const Gondola = mongoose.model('Gondola', gondolaSchema);

module.exports = Gondola;
