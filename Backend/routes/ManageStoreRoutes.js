const express = require('express');
const multer = require('multer');
const router = express.Router();
const storeController = require('../controllers/ManageStoreController');

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post('/', upload.single('image'), storeController.createStoreItem);
router.get('/', storeController.getAllStoreItems);
router.put('/:id', upload.single('image'), storeController.updateStoreItem);
router.delete('/:id', storeController.deleteStoreItem);
router.post('/buy/:id', storeController.buyItem);  // New route for buying

module.exports = router;