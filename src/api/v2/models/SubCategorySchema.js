
const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    name: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  });
  
module.exports = mongoose.model("Subcategory", SubcategorySchema);

  