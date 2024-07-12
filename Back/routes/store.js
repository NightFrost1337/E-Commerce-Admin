const { Router } = require('express');
const router = Router();

const { getStore } = require('../controllers/store');

router.get('/:username/:store', getStore);

module.exports = router;