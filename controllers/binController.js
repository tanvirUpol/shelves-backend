const Bin = require("../models/BinModel");
const mongoose = require("mongoose");
const Gondola = require("../models/GondolaModel");
const productHistory = require("../models/productHistoryModel");

// get all except deleted ones
const getAllBins = async (req, res) => {
  try {
    const bins = await Bin.find({ isDeleted: false });
    const gondola = await Gondola.find({ isDeleted: false });
    res.json({ bins, gondola });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// get all
const getAllBinsID = async (req, res) => {
  try {
    const bins = await Bin.find();
    const gondola = await Gondola.find();
    res.json({ bins, gondola });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all for specific Gondola
// const getAllSpecificBins = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No Such product" });
//   }

//   try {
//     const gondola = await Gondola.findById(id).populate('bins');
//     console.log(gondola);
//     // const gondola = await Gondola.find({gondola_ID: id});
//     res.json(gondola);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

// get all for specific Gondola
const getAllSpecificBins = async (req, res) => {
  const { id } = req.params;
  try {
    // Find a single gondola based on the ID
    const gondola = await Gondola.findOne({ gondola_ID: id }).lean();

    // If the gondola is found, find the corresponding bins
    if (gondola) {
      const bins = await Bin.find({ gondola_ID: id });

      // Add the bins array to the gondola object
      gondola.bins = bins;

      console.log(gondola);
      // Send the response with the combined gondola and bins information
      res.json(gondola);
    } else {
      // If no gondola is found, send an appropriate response
      res.status(404).json({ message: "Gondola not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one bin
const getOneBin = async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "No Such product" });
  // }

  try {
    // const bin = await Bin.findById(id);
    const bin = await Bin.findOne({bin_ID: id});
    console.log(bin);
    const gondola = await Gondola.findOne({ gondola_ID: bin.gondola_ID });

    if (bin == null) {
      return res.status(404).json({ message: "Cannot find bin" });
    }
    res.json({ bin, gondola });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const generateNewAisleWiseBinID = async (newBin) => {
  // Extract existing bin_IDs from the array

  // console.log(type);

  const bins = await Bin.find({ type: newBin.type });

  const existingIDs = bins?.map((obj) => obj.bin_ID);

  // console.log(existingIDs);

  // Find the maximum ID using reduce
  const maxID = existingIDs.reduce((max, id) => {
    // const idNumber = parseInt(id.split('-')[1]);
    const idNumber = parseInt(id.match(/\d+$/));

    return idNumber > max ? idNumber : max;
  }, 0);

  // Generate the new ID by incrementing the max ID
  const newID = `${maxID + 1}`;
  // Format the new number as a string with leading zeros
  const newNumberString = newID.toString().padStart(3, "0");
  // Now you can use newID as needed
  console.log("Generated ID:", newNumberString);

  // formData.gondola_ID = newID
  // console.log(newNumberString);

  newBin.bin_ID = newBin.bin_ID + newNumberString;

  // console.log(newBin);

  await Bin.create(newBin);
};

const generateLevelWiseBinID = async (newBin) => {
  const bins = await Bin.find({
    gondola_ID: newBin.gondola_ID,
    level: newBin.level,
  });

  const existingIDs = bins?.map((obj) => obj.bin_ID);

  console.log(existingIDs);

  // Find the maximum ID using reduce
  const maxID = existingIDs.reduce((max, id) => {
    // const idNumber = parseInt(id.split('-')[1]);
    const idNumber = parseInt(id.match(/\d+$/));

    return idNumber > max ? idNumber : max;
  }, 0);

  // Generate the new ID by incrementing the max ID
  const newID = `${maxID + 1}`;
  // Format the new number as a string with leading zeros
  const newNumberString = newID.toString().padStart(3, "0");
  // Now you can use newID as needed
  console.log("Generated ID:", newNumberString);

  // formData.gondola_ID = newID
  newBin.bin_ID = newBin.bin_ID + newNumberString;

  // console.log(newBin);

  await Bin.create(newBin);
};

// Create a bin
const createBin = async (req, res) => {
  // console.log(req.body);
  try {
    // const newBin = await Bin.create(req.body);
    console.log(req.body);
    const newBin = req.body;

    if (newBin.type === "Regular") {
      await generateLevelWiseBinID(newBin);
    } else {
      await generateNewAisleWiseBinID(newBin);
    }

    // console.log(req.body);
    res.status(201).json({item:newBin});
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

// Delete a bin
const deleteBin = async (req, res) => {
  const { id } = req.params;

  try {
    const bin = await Bin.findOne({ bin_ID: id });
    if (bin == null) {
      return res.status(404).json({ message: "Cannot find bin" });
    }

    if (bin.products.length <= 0) {
      bin.isDeleted = true;
    } else {
      throw new Error("Cannot delete this bin");
    }
    // await bin.remove();
    console.log(bin);
    await bin.save();
    res.json({ message: "Deleted Bin" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const appendProducts = async (req, res) => {
  try {
    const { binID, newProducts } = req.body;

    console.log({ binID, newProducts });

    // Validate if binId and newProducts are provided
    if (!binID || !newProducts) {
      return res
        .status(400)
        .json({
          error: "binId and newProducts are required in the request body",
        });
    }

    // Find the Bin by binId
    const bin = await Bin.findOne({ bin_ID: binID });

    // Check if the bin exists
    if (!bin) {
      return res.status(404).json({ error: "Bin not found" });
    }

    // Append new products to the existing products array
    bin.products = [...bin.products, ...newProducts];

    console.log(bin);

    // Save the updated bin
    await bin.save();

    return res
      .status(200)
      .json({ message: "Products appended successfully", bin });
  } catch (error) {
    console.error("Error appending products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { bin_ID, article_code, article_name } = req.body;

    console.log(article_code);

    console.log(bin_ID, article_code, article_name);
    if (!bin_ID || !article_code) {
      return res
        .status(400)
        .json({
          error: "bin_ID, and article_code are required in the request body",
        });
    }

    // Find the Bin by bin_ID
    const bin = await Bin.findOne({ bin_ID });

    // Check if the bin exists
    if (!bin) {
      return res.status(404).json({ error: "Bin not found" });
    }

    // Find all products in the products array with the specified article_code
    const matchingProducts = bin.products.filter(
      (product) => product.article_code === article_code
    );
    // console.log(matchingProducts);

    // Check if there are matching products
    if (matchingProducts.length === 0) {
      return res
        .status(404)
        .json({
          error: "Products not found in the bin for the specified article_code",
        });
    }

    // Delete the specified quantity of products
    let remainingQuantity = 1;
    for (let i = matchingProducts.length - 1; i >= 0; i--) {
      if (remainingQuantity > 0) {
        // Remove the object from the array
        bin.products.splice(bin.products.indexOf(matchingProducts[i]), 1);
        remainingQuantity--;
      } else {
        // No need to continue if the required quantity has been deleted
        break;
      }
    }

    await productHistory.create({
      article_name,
      article_code,
      action: "Delete",
    });

    // Save the updated bin
    await bin.save();

    return res
      .status(200)
      .json({ message: "Products deleted successfully", bin });
  } catch (error) {
    console.error("Error deleting products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const stayAlive = async (req, res) => {
  return res.status(200).json({ message: "Im back!" });
};

// Update a bin
const updateBin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Bin" });
  }

  try {
    const updatedBin = await Bin.findByIdAndUpdate(id, req.body, { new: true });

    if (updatedBin == null) {
      return res.status(404).json({ message: "Cannot find find" });
    }
    res.json(updatedBin);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

//get data based on article code
const getDataByArticleCode = async (req, res) => {
  try {
    const { articleCode } = req.params;


    const bins = await Bin.find({
      "products.article_code": articleCode,
    }).select({
      "products.$": 1,
      bin_ID: 1,
      gondola_ID: 1,
      dc: 1
    });


    if (!bins || bins.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the given article code" });
    }


    const result = bins.map(bin => ({
      _id: bin._id,
      bin_ID: bin.bin_ID,
      gondola_ID: bin.gondola_ID,
      article_code: bin.products[0].article_code,
      article_name: bin.products[0].article_name,
      site: bin.dc
    }));

    // If data is found, return it
    res.status(200).json( result );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getDataByArticleCodeAndSite = async (req, res) => {
  try {
    const { articleCode, dc } = req.params;

    const bins = await Bin.find({
      "products.article_code": articleCode,
      dc: new RegExp(dc, 'i')
    }).select({
      "products.$": 1,
      bin_ID: 1,
      gondola_ID: 1,
      dc: 1
    });

    if (!bins || bins.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the given article code and dc" });
    }

    const result = bins.map(bin => ({
      _id: bin._id,
      bin_ID: bin.bin_ID,
      gondola_ID: bin.gondola_ID,
      article_code: bin.products[0].article_code,
      article_name: bin.products[0].article_name,
      site: bin.dc
    }));

    // If data is found, return it
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const checkBinExists = async (req, res) => {
  try {
    const { binID } = req.params;

    const bin = await Bin.findOne({bin_ID: binID})
    if (!bin) {
      return res
        .status(404)
        .json({ status: false , message: "No Bin Found" });
    }

    // If data is found, return it
    res.status(200).json( { status: true, message: "Bin Found" } );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllBins,
  getOneBin,
  createBin,
  deleteBin,
  appendProducts,
  deleteProducts,
  getAllSpecificBins,
  updateBin,
  stayAlive,
  getAllBinsID,
  getDataByArticleCode,
  checkBinExists,
  getDataByArticleCodeAndSite
};
