const mongoose = require("mongoose");
const productHistory = require("../models/productHistoryModel");

// get all
const getHistory = async (req, res) => {
  try {
    const bins = await productHistory.find();
    res.json(bins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
    getHistory
};