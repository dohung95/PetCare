const router = require('express').Router();
const { signup, signin, me } = require('../controllers/OwnerController'); // đúng tên file controller của bạn
const { verifyToken } = require('../middlewares/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', verifyToken, me);
router.get('/ping', (req, res) => res.json({ ok: true }));


module.exports = router;
