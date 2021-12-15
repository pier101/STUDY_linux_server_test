const express = require("express");
const router = express.Router();
const { User } = require('../models');
const SHA256 = require('crypto-js/sha256');

router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.json({ success: false });
    }

    const hashedPassword = SHA256(req.body.password + req.body.email).toString();

    await User.create({
      email: req.body.email,
      nick: req.body.nick,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

module.exports = router;