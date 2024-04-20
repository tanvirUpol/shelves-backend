const mongoose = require("mongoose");
const { ift_db } = require("../mongConnection");

const userAppVersionSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = ift_db.model("UserAppVersion", userAppVersionSchema);
