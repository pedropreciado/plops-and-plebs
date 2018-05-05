const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.ObjectId;

const PageSchema = new mongoose.Schema({
  plebIds: [Number],
  pageNumber: Number,
  nextPage: Number,
  plopId: {
    type: ObjectId,
    required: true
  }
})

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;
