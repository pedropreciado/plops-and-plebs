let express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Plop = require('../models/plop');

router.route('/add')
  .get((req, res) => {
    Plop.find((err, plops) => {
      plops.forEach((plop) => {
        plop.plebs = [];

        plop.save((err) => {
          if (err)
          console.log(err);
          console.log('array added to: ', plop.username);
        })
      })

      res.json({ msg: 'adding'});
    })
  })

module.exports = router;
