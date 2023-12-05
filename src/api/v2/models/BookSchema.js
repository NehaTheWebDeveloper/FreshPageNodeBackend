const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: String,
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  });
  
  module.exports= mongoose.model('Book', BookSchema);
  