const mongoose = require('mongoose');

const SelectTypeSchema = new mongoose.Schema({
    name: String,
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    // Add other fields as needed for SelectType
  });
  
  module.exports = mongoose.model('SelectType', SelectTypeSchema);
  