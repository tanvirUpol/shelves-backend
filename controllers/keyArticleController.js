const mongoose = require("mongoose");
const keyArticleModel = require("../models/keyArticleModel");


// get all
const getAllKeyArticles = async (req, res) => {
    try {
      const keyArticles = await keyArticleModel.find().lean();
      res.json(keyArticles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


// const createKeyArticles = async (req,res) => {
//     try {
//         const data = await req.body;
//         console.log(data);
//         await keyArticleModel.deleteMany({})
//         await keyArticleModel.create(data) 
//         res.status(201).json("success");
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: err.message });
//     }
// }


const createKeyArticles = async (req, res) => {
  try {
      const data = req.body;
      console.log(data.length);
      const chunkSize = Math.ceil(data.length / 100);

      console.log(chunkSize);



      // Delete data only on the first chunk
      if (chunkSize > 0) {
          await keyArticleModel.deleteMany({});
      }

      // Insert data chunk by chunk
      for (let i = 0; i < chunkSize; i++) {
          const startIndex = i * 100;
          const chunk = data.slice(startIndex, startIndex + 100);

          console.log(chunk[0]);
          await keyArticleModel.insertMany(chunk);
          console.log("uploaded", i)
      }
      res.status(201).json("success");
  } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
  }
}



module.exports = {
    createKeyArticles,
    getAllKeyArticles
 };