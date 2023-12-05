const Category = require("../models/CategorySchema"); // Import your Category model

// Create or update a category with quiz data

exports.createCategory = async (req, res) => {
  try {
    const { categoryName, quizData } = req.body;

    // Check if the category already exists
    const existingCategory = await Category.findOne({ categoryName });

    if (existingCategory) {
      // Category exists, update its quizData array with unique questions
    
      quizData.forEach((newQuestion) => {
        const isNewQuestionUnique = existingCategory.quizData.every(
          (existingQuestion) => {
            return existingQuestion.id !== newQuestion.id;
          }
        );
        if (isNewQuestionUnique) {
          existingCategory.quizData.push(newQuestion);
        }
      });
      

      const savedCategory = await existingCategory.save();

      res.status(200).json({
        success: true,
        message: `Quiz data added to category '${categoryName}'`,
        data: savedCategory,
      });
    } else {
      // Category does not exist, create a new category with the provided category name and quiz data
      const category = new Category({ categoryName, quizData });
      const savedCategory = await category.save();

      res.status(201).json({
        success: true,
        message: `Category '${categoryName}' created with quiz data`,
        data: savedCategory,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//   exports.createOrUpdateCategoryWithQuiz = async (req, res) => {
//     try {
//       const { categoryName, quizData } = req.body;

//       // Check if the category already exists
//       let existingCategory = await Category.findOne({ categoryName });
//   console.log(existingCategory,"existingCategory")
//       if (existingCategory) {
//         // Category exists, update its quizData array
//         existingCategory.quizData.push(quizData);
//       } else {
//         // Category does not exist, create a new category with the provided quiz data
//         existingCategory = new Category({ categoryName, quizData });
//       }

//       // Save the category (either the existing one with updated quiz data or the new one)
//       const savedCategory = await existingCategory.save();

//       res.status(200).json({
//         success: true,
//         message: `Quiz data added to category '${categoryName}'`,
//         data: savedCategory,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   };

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
exports.getQuizById = async (req, res) => {
    try {
      const { quizId } = req.params;

      // Search for the quiz with the given quizId within all categories
      let foundQuiz = null;

      const categories = await Category.find();

      categories.forEach((category) => {
        const quiz = category.quizData.find((quiz) => quiz.quizId === quizId);
        if (quiz) {
          foundQuiz = quiz;
          return;
        }
      });

      if (!foundQuiz) {
        return res.status(404).json({ error: `Quiz with quizId '${quizId}' not found` });
      }

      res.status(200).json({ status: true, message: "Quiz data found", data: foundQuiz });
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
