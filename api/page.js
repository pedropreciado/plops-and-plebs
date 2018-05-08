let express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Page = require('../models/page');

router.route('/page')
  .get((req, res) => {
    Page.findById(req.query.id, (err, page) => {
      if (err)
      console.log(err);

      res.json(page);
    })
  })
module.exports = router;
