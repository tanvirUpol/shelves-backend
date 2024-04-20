const UAV = require("../models/UserAppVersionModel");

// Get all
const getAll = async (req, res) => {
  try {
    const data = await UAV.find();
    if (data.length > 0) {
      res.json({ status: true, data: data });
    } else {
      res.json({ status: false, message: "no data found" });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Get one
const getOne = async (req, res) => {
  try {
    const data = await UAV.findOne({ email });
    if (data) {
      res.json({ status: true, data: data });
    } else {
      res.json({ status: false, message: "no data found" });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// create
const createUserAppVersion = async (req, res) => {
  const data = req.body;
  try {
    const data = await UAV.create(data);
    res
      .status(201)
      .json({ status: true, message: "User app version recorded" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


module.exports = {
    getAll,
    getOne,
    createUserAppVersion
  };
  