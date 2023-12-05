const Question = require("../models/QuizSchema");


exports.getQuestions = async (req, res) => {
  const { quiztype, screentype } = req.params;
  console.log(quiztype, "quiztype", screentype, "screentype");

  try {
    if (!isValidquiztype(quiztype) || !isValidscreentype(screentype)) {
      return res.status(400).json({ error: "Invalid quiztype or screentype" });
    }

    const questions = await Question.find({ quiztype, screentype });

    if (questions.length === 0) {
      return res.status(200).json({ message: "No questions found" });
    }

    res
      .status(200)
      .json({ message: "Questions retrieved successfully", data: questions });
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.getQuizByTypeAndId = async (req, res) => {
  const { quiztype, quizId } = req.params;

  try {
    if (!["solo", "one-to-one", "multiple"].includes(quiztype)) {
      return res.status(400).json({ error: "Invalid quiztype" });
    }

    const quiz = await Question.findOne({ _id: quizId, quiztype });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.status(200).json({ data: quiz });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Create a quiz based on the specified type
exports.addQuiz = async (req, res) => {
  const { quiztype, screentype } = req.params;
  console.log(quiztype, "quiztype", screentype, "screentype");

  try {
    if (!isValidquiztype(quiztype) || !isValidscreentype(screentype)) {
      return res.status(400).json({ error: "Invalid quiztype or screentype" });
    }
    let newQuiz;
    switch (quiztype) {
      case "solo":
        newQuiz = new Question(req.body);
        await newQuiz.save();

        break;
      case "one-to-one":
        newQuiz = new Question(req.body);
        await newQuiz.save();

        break;
      case "multiple":
        newQuiz = new Question(req.body);
        await newQuiz.save();

        break;
    }

    console.log(newQuiz, "screentype");

    res.status(201).json({ message: "Quiz created successfully" });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Define and validate quiz types
function isValidquiztype(quiztype) {
  return ["solo", "one-to-one", "multiple"].includes(quiztype);
}

// Define and validate screen types
function isValidscreentype(screentype) {
  return ["quiz", "popup", "afterDisplay", "features"].includes(screentype);
}

function createSoloQuiz(data) {
  return new Question(data);
}

function createOneToOneQuiz(data) {
  return new Question(data);
}

function createMultipleQuiz(data) {
  return new Question(data);
}
// Delete All Questions

exports.dropQuestions = async (req, res) => {
  const { quiztype } = req.params;

  try {
    if (!["solo", "one-to-one", "multiple"].includes(quiztype)) {
      return res.status(400).json({ error: "Invalid quiztype" });
    }

    // Delete quizzes of the specified type from the database
    await Question.deleteMany({ quiztype });

    res.status(200).json({ message: "Quizzes deleted successfully" });
  } catch (error) {
    console.error("Error deleting quizzes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.dropQuestionsBasedOnId = async (req, res) => {
  const { quiztype, quizId } = req.params;

  try {
    if (!["solo", "one-to-one", "multiple"].includes(quiztype)) {
      return res.status(400).json({ error: "Invalid quiztype" });
    }

    // Delete the quiz with the specified _id and quiztype from the database
    const deletedQuiz = await Question.findOneAndDelete({
      _id: quizId,
      quiztype,
    });

    if (!deletedQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateQuiz = async (req, res) => {
  const { quiztype, quizId } = req.params;

  try {
    if (!["solo", "one-to-one", "multiple"].includes(quiztype)) {
      return res.status(400).json({ error: "Invalid quiztype" });
    }

    // Update the quiz with the specified _id and quiztype in the database
    const updatedQuiz = await Question.findOneAndUpdate(
      { _id: quizId, quiztype },
      req.body,
      { new: true } // To return the updated quiz document
    );

    if (!updatedQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz updated successfully" });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
