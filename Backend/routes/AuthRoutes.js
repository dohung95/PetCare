// File: routes/AuthRoutes.js
const router = require('express').Router();
const { signup, signin, me } = require('../controllers/AuthController');
const { verifyToken } = require('../middlewares/auth.middlewares');

console.log('Imported signup:', signup);
console.log('Imported signin:', signin);

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', verifyToken, me);

module.exports = router;
