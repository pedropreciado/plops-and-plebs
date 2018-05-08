let express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Plop = require('../models/plop');
const Page = require('../models/page');

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

router.route('/plop/plebs')
  .get((req, res) => {
    if (req.query.pageId) {
      Page.findById(req.query.pageId, (err, page) => {
        if (err)
        console.log(err);

        res.json(page);
      })
    } else if (req.query.plopId) {
      Page.findOne({'plopId': req.query.plopId }, (err, page) => {
        if (err)
        console.log(err);

        res.json(page);
      })
    } else {
      res.json({
        error: 'Need pageid or plop id'
      })
    }
  })
module.exports = router;
