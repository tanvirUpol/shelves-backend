const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
  // gondola: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Gondola',
  //   required: true,
  // },
  bin_ID: {
    type: String,
    required: true,
  },
  gondola_ID: {
    type: String,
    default: "",
  },
  dc: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  
  level: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    default: "Regular",
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  products: {
    type: Array,
    default: [],
    required: true,
  },
});

const Bin = mongoose.model("Bin", binSchema);

module.exports = Bin;
