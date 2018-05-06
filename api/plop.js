let express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Plop = require('../models/plop');

router.route('/plop')
  .get((req, res) => {
    Plop.findById(req.query.id, (err, plop) => {
      if (err)
      console.log(err);

      res.json(plop);
    })
  })
  .post((req, res) => {
    console.log(req.body);
    let plop = new Plop(req.body);

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
