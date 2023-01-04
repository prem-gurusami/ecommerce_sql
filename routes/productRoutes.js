const express = require('express');

const router = express.Router();
const { showProducts } = require('../controllers/products');
const { verifyJWT } = require('../middleware');

router.route('/').get(verifyJWT, showProducts);

module.exports = router;
