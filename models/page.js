const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

const PageSchema = new mongoose.Schema({
  plebIds: [String],
  nextPage: ObjectId,
  plopId: ObjectId
})

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;
