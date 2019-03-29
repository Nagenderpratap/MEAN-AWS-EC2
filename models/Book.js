var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    description: String,
    published_year: String,
    publisher: String,
    bookName: String,
	  authorName: String,
    updated_date: { type: Date, default: Date.now }
  });
// var CollectionName = mongoose.model('collectionName');

  module.exports = mongoose.model('Book', BookSchema);
