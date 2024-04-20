const mongoose = require("mongoose");
const { ift_db } = require("../mongConnection");
const ActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      // enum: [
      //   "create",
      //   "read",
      //   "update",
      //   "delete",
      //   "register",
      //   "log_in",
      //   "log_out",
      //   "fetch",
      // ],
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const activityLogModel = ift_db.model("ActivityLog", ActivitySchema);

module.exports = activityLogModel;
