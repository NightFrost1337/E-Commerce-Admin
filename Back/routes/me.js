const { Router } = require('express');
const router = Router();

const { getMe } = require('../controllers/me');
const shopsRouter = require('./shops');

router.get('/', getMe)
router.use('/shops', shopsRouter);

module.exports = router;