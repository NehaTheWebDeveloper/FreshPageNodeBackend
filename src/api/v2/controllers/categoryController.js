const Category = require("../models/CategorySchema"); // Import your Category model

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    const categoryData  = await Category.find()
    console.log(categoryData,"categoryData")

    if(categoryData.length>0){
        let checking = false
        for(let i =0 ;i<categoryData.length;i++){
            if(categoryData[i]["categoryName"].toLowerCase()===categoryName.toLowerCase()){
                checking=true
                break
            }
        }
        if(checking ===false){
            const category = new Category({ categoryName });
            const savedCategory = await category.save();
            res
            .status(201)
            .json({ success: true, message: "Category Data", data: savedCategory });
        }
        else{
            res
            .status(201)
            .json({ success: true, message: `This Category already exist ${categoryName} already exists`});
        }
    }else{
        const category = new Category({ categoryName });
            const savedCategory = await category.save();
            res
            .status(201)
            .json({ success: true, message: "Category Data", data: savedCategory });
    }
    
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a category by ID
exports.updateCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a category by ID
exports.deleteCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Category.findByIdAndRemove(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
