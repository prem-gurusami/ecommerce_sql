const express = require('express');

const router = express.Router();

const {
  renderSignup,
  signup,
  renderLogin,
  login,
} = require('../controllers/authentication');

router.route('/signup').get(renderSignup).post(signup);

router.route('/login').get(renderLogin).post(login);

module.exports = router;
