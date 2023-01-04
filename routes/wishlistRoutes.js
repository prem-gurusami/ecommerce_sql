const express = require('express');

const router = express.Router();
const { verifyJWT } = require('../middleware');
const { showWishlist, addWishlist } = require('../controllers/wishlist');

router.route('/').get(verifyJWT, showWishlist).post(verifyJWT, addWishlist);

module.exports = router;
