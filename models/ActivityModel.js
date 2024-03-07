const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const productHistoryModel = mongoose.model("ActivityLog", ActivitySchema);

module.exports = productHistoryModel;
