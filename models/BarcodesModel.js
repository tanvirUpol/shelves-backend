const mongoose = require("mongoose")
const { shelves_db } = require("../mongConnection");


const userSchema = new mongoose.Schema({
      material: {
            type: String,
            required: true
      },
      description: {
            type: String,
            required: true,
      },
      barcode: {
            type: String,
            required: true,
      }
})

module.exports = shelves_db.model("Barcodes", userSchema)