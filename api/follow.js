let express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

let Page = require('../models/page');

router.route('/follow')
  .post((req, res) => {

    Page.findById(req.query.plopId, (err, page) => {
      if (err)
      console.log(err);

      if (page.data.length === 4) {
        let pageNumber = page.pageNumber + 1;
        page.nextPage = pageNumber;

        let nextPage = new Page({
          plebIds: [req.body.plebId],
          pageNumber,
          nextPage: null,
          plopId: page.plopId
        })

        page.save((err) => {
          console.log(err);
        });

        nextPage.save((err) => {
          console.log(err);
        });

        res.json()
      } else {
        page.data.push(plebId);
        page.save((err) => {
          console.log(err);
        })

        res.json({page, nextPage});
      }
    })
  })
  .post(({ body }, res) => {
    body.token = null;

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
