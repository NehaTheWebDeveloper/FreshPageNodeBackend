const express = require("express");
const categoryController = require("../controllers/categoryController");
const subcategoryController = require("../controllers/subCategoryController");
const catController = require("../controllers/catController");


const router = express.Router();

router.post("/v2/quiz/category", catController.createCategory);
router.get("/v2/quiz/category/:quizId", catController.getQuizById);


router.post("/v1/quiz", categoryController.createCategory);
router.get("/v1/quiz", categoryController.getAllCategories);
router.get("/v1/quiz/:categoryId", categoryController.getCategoryById);
router.put("/v1/quiz/:cat", categoryController.updateCategoryById);
router.delete("/v1/quiz/:cat", categoryController.deleteCategoryById);

// router.post("/v1/quiz/subcategories", subcategoryController.createCategory);
// router.get("/v1/quiz/subcategories", subcategoryController.getAllCategories);
// router.get("/v1/quiz/subcategories/:subcategoryId", subcategoryController.getCategoryById);
// router.put("/v1/quiz/subcategories/:subcategoryId", subcategoryController.updateCategoryById);
// router.delete("/v1/quiz/subcategoryId/:subcategoryId", subcategoryController.deleteCategoryById);

module.exports = router;

