const { Router } = require('express');
const router = Router();

const { getMe, getShops } = require('../controllers/me');

const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, getMe)
router.get('/shops', authMiddleware, getShops);

module.exports = router;