const express = require('express');
const { getOwners, getOwnerById, createOwner, updateOwner, deleteOwner } = require('../controllers/OwnerController');
const router = express.Router();

router.route('/').get(getOwners).post(createOwner);
router.route('/:id').get(getOwnerById).put(updateOwner).delete(deleteOwner);

module.exports = router;