let express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Plop = require('../models/plop');

router.route('/plop')
  .get((req, res) => {
    if (req.query.id) {
      Plop.findById(req.query.id, (err, plop) => {
        if (err)
        console.log(err);

        res.json(plop);
      })
    } else {
      console.log('getting all plops ...');

      Plop.find((err, plops) => {
        if (err)
        console.log(err);

        res.json({ plops });
      })
    }
  })
  .post((req, res) => {
    let plebCount = 0;
    let username = req.body.username;

    let plop = new Plop({
      username,
      plebCount
    });

    plop.save((err) => {
      if (err)
      console.log(err);

      res.json({
        message: 'success!',
        plop
      })
    })
  })

module.exports = router;
