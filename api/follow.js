let express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;

let Page = require('../models/page');
let Plop = require('../models/plop');

async function findLastPage(page) {
  let lastPage = page;

  while (lastPage.nextPage) {
    lastPage = await Page.findById(lastPage.nextPage, (err) => {
        console.log(err);
    })
  }

  return lastPage;
}

router.route('/follow')
  .post((req, res) => {
    let plopId = req.body.plopId;
    let plebId = req.body.plebId;

    Page.findOne({ plopId }, (err, page) => {
      if (err)
      console.log(err);

      if (page) {
        findLastPage(page)
          .then((lastPage) => {
            console.log('current lastpage: ', lastPage);
            let hasPlebs = Boolean(lastPage.plebIds);

            if (hasPlebs && lastPage.plebIds.length === 5) {
              let newPage = new Page({
                plebIds: [plebId],
                nextPage: null
              })

              newPage.save((err, newPage) => {
                lastPage.nextPage = newPage._id;

                lastPage.save((err) => {
                  console.log(err);
                })

                res.json({
                  lastPage,
                  newPage
                })
              })
            } else {
              lastPage.plebIds.push(plebId);

              lastPage.save((err) => {
                console.log(err);
              })

              res.json({
                lastPage
              })
            }
          })
      } else {
      console.log('page not found');
      Plop.findById(req.body.plopId, (err, plop) => {
        if (err) {
          console.log(err);
        }

        let newPage = new Page({
          plebIds: [req.body.plebId],
          nextPage: null,
          plopId: req.body.plopId
        })

        newPage.save((err, page) => {
          if (err)
          console.log(err);

          plop.plebCount += 1;

          res.json({
            plop,
            newPage
          })
        })

        })
      }
    })
  })


module.exports = router;
