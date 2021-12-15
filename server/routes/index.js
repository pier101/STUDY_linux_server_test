const express = require('express');
const router = express.Router();
const register = require('./register');
const login = require('./login');
const logout = require('./logout');

router.use((req, res, next) => {
  console.log(1111111111111111111111);
})
router.use('/register', register);
router.use('/login', login);
router.use('/logout', logout);

module.exports = router;
