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
  .post(({ body }, res) => {
    body.pageNumber = 1;
    body.plebIds = [];
    body.nextPage = null;
    body.plopId = body.id

    let page = new Page(body);

    page.save((err) => {
      if (err)
      console.log(err);

      res.json({
        message: 'success!',
        page
      })
    })
  })
