const mongoose = require("mongoose");
const keyArticleModel = require("../models/keyArticleModel");


// get all
const getAllKeyArticles = async (req, res) => {
    try {
      const keyArticles = await keyArticleModel.find();
      res.json(keyArticles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


const createKeyArticles = async (req,res) => {
    try {
        const data = await req.body;
        console.log(data);
        await keyArticleModel.deleteMany({})
        await keyArticleModel.create(data) 
        res.status(201).json("success");
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: err.message });
    }
}


module.exports = {
    createKeyArticles,
    getAllKeyArticles
 };