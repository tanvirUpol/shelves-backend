const Activity = require("../models/ActivityModel");



// create a activity
const createActivityLog = async (req, res) => {
  const data = req.body;

  try {
    const NewActivity = await Activity.create(data);
    res.status(201).json({ message: "User activity recorded" });
  } catch (err) {
    res.status(500).json({ status:false, message: err.message });
  }
};



// get all acitivity
// const getAllActivityLog = async (req, res) => {
//   try {
//     const allActivity = await Activity.find().populate({ 
//       path: 'user',
//       select: '-__v -password -createdAt -updatedAt' });
//     res.status(201).json({
//       status: true,
//       logs: allActivity,
//     });
//   } catch (err) {
//     res.status(500).json({ status:false, message: err.message });
//   }
// };


const getAllActivityLog = async (req, res) => {
  try {
    let filter = {};

    // Check if type filter is provided in the request body
    if (req.body.type) {
      filter.type = req.body.type;
    }

    // Check if userId filter is provided in the request body
    if (req.body.user) {
      filter.user = req.body.user;
    }

    // You can add more conditions for additional filters here

    const allActivity = await Activity.find(filter).populate({ 
      path: 'user',
      select: '-__v -password -createdAt -updatedAt' });

    res.status(200).json({
      status: true,
      logs: allActivity,
    });
  } catch (err) {
    res.status(500).json({ status:false, message: err.message });
  }
};


// get all acitivity by type
const getAllActivityLogByType = async (req, res) => {
  const data = req.body;
  try {
    const allActivity = await Activity.find({type: data.type}).populate({ 
      path: 'user',
      select: '-__v -password -createdAt -updatedAt' });
    res.status(201).json({
      status: true,
      logs: allActivity,
    });
  } catch (err) {
    res.status(500).json({ status:false, message: err.message });
  }
};


const deleteActivityLogById = async (req, res) => {
  const { id } = req.params; // Assuming the ID is passed in the request parameters

  try {
    const deletedLog = await Activity.findByIdAndDelete(id);
    if (!deletedLog) {
      return res.status(404).json({ status: false, message: "Activity log not found" });
    }

    res.status(200).json({ status: true, message: "Activity log deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  createActivityLog,
  getAllActivityLog,
  getAllActivityLogByType,
  deleteActivityLogById
}



