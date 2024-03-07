const mongoose = require("mongoose");
const { shelves_db } = require("../mongConnection");

const keyArticleSchema = new mongoose.Schema({
  article_code: {
    type: String,
    required: true
  },
  article_name: {
    type: String,
    required: true
  }
});

const keyArticleModel =  shelves_db.model('keyArticle', keyArticleSchema);


module.exports = keyArticleModel;
