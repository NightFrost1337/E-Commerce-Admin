const { Router } = require('express');
const router = Router();

const { getShops, createShop } = require('../controllers/shops');

router.get('/', getShops)
router.post('/', createShop);

module.exports = router;