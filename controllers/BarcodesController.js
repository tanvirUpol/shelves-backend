const Barcode = require('../models/BarcodesModel');

function transformData(inputData) {
  const outputData = {};
  inputData.forEach(item => {
      if (!outputData.material) {
          outputData.material = item.material;
          outputData.description = item.description;
          outputData.barcodes = [];
      }
      outputData.barcodes.push(item.barcode);
  });
  
  return outputData;
}


// Controller function to fetch all documents by material
const getAllByMaterial = async (req, res) => {
  const { material } = req.params;
  
  try {
    const barcodes = await Barcode.find({ material });



    if(!barcodes || barcodes.length === 0) {
      return res.status(404).json({ message: 'Barcodes not found', status: false });
    }
    
    res.json({status: true, data:transformData(barcodes)});
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
    if (!barcodeDoc || barcodeDoc.length === 0) {
      return res.status(404).json({ message: 'Product not found', status: false });
    }
    res.json({ status:true, data:barcodeDoc[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllByMaterial, getAllByBarcode };
