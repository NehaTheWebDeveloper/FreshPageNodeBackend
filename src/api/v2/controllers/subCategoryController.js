const Subcategory = require('../models/SubCategorySchema'); 

// Create a new subcategory
const createSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const subcategory = new Subcategory({ name, category: categoryId });
    const savedSubcategory = await subcategory.save();
    res.status(201).json(savedSubcategory);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all subcategories
const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category', 'name');
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single subcategory by ID
const getSubcategoryById = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const subcategory = await Subcategory.findById(subcategoryId).populate('category', 'name');
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a subcategory by ID
const updateSubcategoryById = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const { name, categoryId } = req.body;
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      { name, category: categoryId },
      { new: true }
    ).populate('category', 'name');
    if (!updatedSubcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a subcategory by ID
const deleteSubcategoryById = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const deletedSubcategory = await Subcategory.findByIdAndRemove(subcategoryId).populate('category', 'name');
    if (!deletedSubcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategoryById,
  deleteSubcategoryById,
};
