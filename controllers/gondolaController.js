const Gondola = require("../models/GondolaModel");
const mongoose = require("mongoose");
const Bin = require("../models/BinModel");

// get all non deleted
const getAllGondola = async (req, res) => {
  try {
    const gondola = await Gondola.find({ isDeleted: false });
    res.json(gondola);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all
const getAllGondolaForID = async (req, res) => {
  try {
    const gondola = await Gondola.find()
    res.json(gondola);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one gondola
const getOneGondola = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such gondola" });
  }

  try {
    const gondola = await Gondola.findById(id);
    if (gondola == null) {
      return res.status(404).json({ message: "Cannot find gondola" });
    }
    res.json(gondola);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};




// Create a gondola
const createGondola = async (req, res) => {
  // console.log(req.body);
  try {
    const item = await Gondola.create(req.body);
    console.log(item);
    res.status(201).json({item});
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

// Update a gondola
const updateGondola = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such gondola" });
  }

  try {
    const updatedGondola = await Gondola.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (updatedGondola == null) {
      return res.status(404).json({ message: "Cannot find gondola" });
    }

    res.json(updatedGondola);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};


const CheckEmpty = (bins) => {
  for (const bin of bins) {
    if (bin.products && bin.products.length > 0) {
      return false; // Return false if any products array is not empty
    }
  }
  return true; 
}

// delete a gondola
const deleteGondola = async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "No Such gondola" });
  // }

  const bins = await Bin.find({ gondola_ID: id });


  // console.log(CheckEmpty(bins));


  console.log(bins);
 

  try {
    if(!CheckEmpty(bins)){
      throw new Error('Cannot delete this Gondola')
    }


    if (bins.length > 0) {
      // Create an array of update operations for each bin
      const updateOperations = bins.map(bin => ({
        updateOne: {
          filter: { _id: bin._id }, // Identify the document to update
          update: { $set: { isDeleted: true } } // Set isDeleted to true
        }
      }));

      // Perform the bulk update
      await Bin.bulkWrite(updateOperations);
    }
    
    const updatedGondola = await Gondola.findOneAndUpdate({ gondola_ID: id }, req.body, { new: true });

    if (updatedGondola == null) {
      return res.status(404).json({ message: "Cannot find gondola" });
    }

    res.json(updatedGondola);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createGondola,
  getAllGondola,
  getOneGondola,
  updateGondola,
  deleteGondola,
  getAllGondolaForID
};
