require("dotenv").config();
const mongoose = require("mongoose");


let shelves_db = mongoose.createConnection(process.env.MONG_URI)
let activity_db = mongoose.createConnection(process.env.MONG_URI_ACTIVITY)


module.exports = {
    shelves_db,
    activity_db
  };
  