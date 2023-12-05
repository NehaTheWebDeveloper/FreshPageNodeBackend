const express = require("express");
const quizController = require("../controllers/quizController");
const resultController = require("../controllers/resultController");

const router = express.Router();

// APIs for SELECT Type & Quiz Type
// router.get("/v1/quiz/:selectType/:quizType", quizController.getQuizBySelectType);
router.get("/v1/quiz/:cat/:subcat/:chapter/:book/:selectType/:quizType", quizController.getQuizByFilters);



router.post("/v1/quiz", quizController.addQuiz);
router.put("/v1/quiz/:selectType/:quiztype/:quizId", quizController.updateQuiz);
router.delete("/v1/quiz/:selectType/:quiztype/", quizController.dropQuestions);
router.delete("/v1/quiz/:selectType/:quiztype//:quizId", quizController.dropQuestionsBasedOnId);
router.get("/v1/quiz/:selectType/:quiztype//:quizId", quizController.getQuizByTypeAndId);

// API for Get upto Select Type
router.get("/v1/quiz/get-quiz-with-select-type", quizController.getQuizByAllSelectType);
// router.get("/v1/quiz/:selectType", quizController.getQuizBySelectType);




router.get("/results", resultController.getResults);
router.post("/results", resultController.storeResults);
router.delete("/results", resultController.storeResults);

module.exports = router;






