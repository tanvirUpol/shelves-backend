const Site = require("../models/SiteModel");

// Get all sites
const getSites = async (req, res) => {
  try {
    const sites = await Site.find();
    res.json({status: true , sites:sites});
  } catch (err) {
    res.status(500).json({status: false , message: err.message });
  }
};

// Get a single site by ID
const getSiteById = async (req, res) => {
  const { id } = req.params;
  try {
    const site = await Site.findById(id);
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }
    res.json({satus: true, site:site});
  } catch (err) {
    res.status(500).json({status:false, message: err.message });
  }
};

// Create or Update Site
const createOrUpdateSite = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // If ID provided, update existing site
    if (id) {
      const site = await Site.findByIdAndUpdate(
        id,
        data,
        { new: true }
      );

      if (!site) {
        return res.status(404).json({ message: "Site not found" });
      }

      res.json(site);
    } else {
      // If no ID provided, create a new site
      const site = new Site(data);
      const savedSite = await site.save();
      res.status(201).json(savedSite);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createOrUpdateSite,
  getSiteById,
  getSites
};
