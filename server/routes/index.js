var express = require('express');
var router = express.Router();

const maria = require('../maria');

/* GET home page. */
router.get('/', (req, res, next) => {
  maria.query('select * from test', (err, rows, fields) => {
    if(!err) {
      res.send(rows);
    } else {
      console.log("err : " + err);
      res.status(500).json({ err });
    }
  });
});

module.exports = router;
