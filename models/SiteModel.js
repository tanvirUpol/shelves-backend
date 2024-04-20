const mongoose = require('mongoose');
const { shelves_db } = require("../mongConnection");

const storageLocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

const SiteModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
        
    },
    floor: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        // required: true,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    storage_location: [{
        type: storageLocationSchema,
        required: true
    }]
});

const Site = shelves_db.model('Site', SiteModelSchema);

module.exports = Site;
