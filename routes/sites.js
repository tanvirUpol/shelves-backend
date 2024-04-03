const express = require('express');
const router = express.Router();
const { createOrUpdateSite, getSiteById, getSites  } = require('../controllers/SiteController');


// Get all sites
router.get('/', getSites);

// Get a single site by ID
router.get('/:id', getSiteById);

// Create or Update a site
router.post('/', createOrUpdateSite); //create
router.patch('/:id', createOrUpdateSite); //update

module.exports = router;
