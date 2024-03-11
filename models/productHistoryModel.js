const mongoose = require("mongoose");
const { shelves_db } = require("../mongConnection");

const productHistorySchema = new mongoose.Schema(
  {
    article_code: {
      type: String,
      required: true,
    },
    article_name: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const productHistoryModel = shelves_db.model("ProductHistory", productHistorySchema);

module.exports = productHistoryModel;
