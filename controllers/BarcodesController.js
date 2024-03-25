const Barcode = require('../models/BarcodesModel');

// Controller function to fetch all documents by material
const getAllByMaterial = async (req, res) => {
  const { material } = req.params;
  
  try {
    const barcodes = await Barcode.find({ material });
    res.json(barcodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to fetch all documents by barcode
const getAllByBarcode = async (req, res) => {
  const { barcode } = req.params;

  console.log(barcode);
  
  try {
    const barcodeDoc = await Barcode.find({ barcode });
    if (!barcodeDoc) {
      return res.status(404).json({ message: 'Barcode not found' });
    }
    res.json(barcodeDoc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllByMaterial, getAllByBarcode };
