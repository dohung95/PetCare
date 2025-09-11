const router = require('express').Router();
const { signup, signin, me } = require('../controllers/OwnerController');
const { verifyToken } = require('../middlewares/auth.middlewares');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', verifyToken, me);

module.exports = router;