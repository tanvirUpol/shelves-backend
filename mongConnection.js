require("dotenv").config();
const mongoose = require("mongoose");


let shelves_db = mongoose.createConnection(process.env.MONG_URI)
// let activity_db = mongoose.createConnection(process.env.MONG_URI_ACTIVITY)
let ift_db = mongoose.createConnection(process.env.MONG_URI_IFT)


module.exports = {
    shelves_db,
    ift_db
  };
  