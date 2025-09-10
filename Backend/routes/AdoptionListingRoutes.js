const express = require('express');
const { getAdoptionListings, getAdoptionListingById, createAdoptionListing, updateAdoptionListing, deleteAdoptionListing } = require('../controllers/AdoptionListingController');
const router = express.Router();

router.route('/').get(getAdoptionListings).post(createAdoptionListing);
router.route('/:id').get(getAdoptionListingById).put(updateAdoptionListing).delete(deleteAdoptionListing);

module.exports = router;