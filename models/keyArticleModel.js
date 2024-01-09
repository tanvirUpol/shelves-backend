const mongoose = require("mongoose");

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

const keyArticleModel =  mongoose.model('keyArticle', keyArticleSchema);


module.exports = keyArticleModel;
