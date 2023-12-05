const Question = require("../models/QuizSchema");

function isValidquiztype(quizType) {
  return ["solo", "one-to-one", "multiple"].includes(quizType);
}

function isValidselectType(selectType) {
  return ["quiz", "popup", "afterDisplay", "features"].includes(selectType);
}

// Get All Question with single select type

// exports.getQuizBySelectType = async (req, res) => {
//   const { quizType, selectType } = req.params;

//   try {
//     if (!isValidquiztype(quizType) || !isValidselectType(selectType)) {
//       return res.status(400).json({ error: "Invalid quizType or selectType" });
//     }

//     // Use Mongoose to query the database for matching documents
//     const fetchedQuiz = await Question.findOne({
//       'selectTypes': {
//         $elemMatch: {
//           'selectType': selectType,
//           'quizTypes': {
//             $elemMatch: {
//               'quizType': quizType
//             }
//           }
//         }
//       }
//     });

//     if (!fetchedQuiz) {
//       return res.status(404).json({ message: "No questions found" });
//     }

//     res.status(200).json({ message: "Questions retrieved successfully", data: fetchedQuiz });
//   } catch (error) {
//     console.error("Error retrieving questions:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// exports.getQuizBySelectType = async (req, res) => {
//   const { quizType, selectType } = req.params;

//   try {
//     if (!isValidquiztype(quizType) || !isValidselectType(selectType)) {
//       return res.status(400).json({ error: "Invalid quizType or selectType" });
//     }

//     // Use Mongoose aggregation to filter the data
//     const filteredQuiz = await Question.aggregate([
//       {
//         $unwind: "$selectTypes",
//       },
//       {
//         $unwind: "$selectTypes.quizTypes",
//       },
//       {
//         $match: {
//           "selectTypes.selectType": selectType,
//           "selectTypes.quizTypes.quizType": quizType,
//         },
//       },
//       {
//         $project: {
//           _id: 0, // Exclude _id field
//           selectTypes: 1, // Include the filtered selectTypes field
//         },
//       },
//     ]);

//     if (filteredQuiz.length === 0) {
//       return res.status(404).json({ message: "No questions found" });
//     }

//     res.status(200).json({
//       message: "Questions retrieved successfully",
//       data: filteredQuiz[0], // Assuming you only want the first matching document
//     });
//   } catch (error) {
//     console.error("Error retrieving questions:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// exports.getQuizBySelectType = async (req, res) => {
//   const { quizType, selectType } = req.params;

//   try {
//     if (!isValidquiztype(quizType) || !isValidselectType(selectType)) {
//       return res.status(400).json({ error: "Invalid quizType or selectType" });
//     }

//     // Use Mongoose to query the database for matching documents
//     const fetchedQuiz = await Question.findOne({
//       "selectTypes.selectType": selectType,
//       "selectTypes.quizTypes.quizType": quizType,
//     });

//     if (!fetchedQuiz) {
//       return res.status(404).json({ message: "No questions found" });
//     }

//     // Extract the matching selectType and quizType
//     const matchingSelectType = fetchedQuiz.selectTypes.find(
//       (st) => st.selectType === selectType
//     );
//     const matchingQuizType = matchingSelectType.quizTypes.find(
//       (qt) => qt.quizType === quizType
//     );

//     res.status(200).json({
//       message: "Questions retrieved successfully",
//       data: {
//         selectType: matchingSelectType,
//         quizType: matchingQuizType,
//       },
//     });
//   } catch (error) {
//     console.error("Error retrieving questions:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
exports.getQuizByFilters = async (req, res) => {
  const { cat, subcat, chapter, book, selectType, quizType } = req.params;
  console.log(cat, subcat, chapter, book, selectType, quizType)
  try {
    // if (
    //   !isValidCategory(cat) ||
    //   !isValidSubCategory(subcat) ||
    //   !isValidChapter(chapter) ||
    //   !isValidBook(book) ||
    //   !isValidselectType(selectType) ||
    //   !isValidquiztype(quizType)
    // ) {
    //   return res.status(400).json({ error: "Invalid parameters" });
    // }

    // Use Mongoose to query the database for matching documents
    const fetchedQuiz = await Question.findOne({
      "categories.categoryName": cat,
      // "categories.subCategories.subCategory": subcat,
      // "categories.subCategories.chapters.chapter": chapter,
      // "categories.subCategories.chapters.booksMusicAudioBooks.booksMusicAudioBook": book,
      // "categories.subCategories.subCategories.selectTypes.selectType": selectType,
      // "categories.subCategories.subCategories.selectTypes.quizTypes.quizType": quizType,
    });

    if (!fetchedQuiz) {
      return res.status(404).json({ message: "No questions found" });
    }

    // console.log(fetchedQuiz.categories,"fetchedQuiz.categories")

    // Extract the matching data
    const matchingCategory = fetchedQuiz.categories.find(
      (category) => category.categoryName === cat
    );
    // console.log(matchingCategory,"matchingCategory")

    const matchingSubCategory = matchingCategory.subCategories.find(
      (subCategory) => subCategory.subCategory === subcat
    );
    const matchingChapter = matchingSubCategory.chapters.find(
      (chap) => chap.chapter === chapter
    );
    const matchingBook = matchingChapter.booksMusicAudioBooks.find(
      (bookMusic) => bookMusic.booksMusicAudioBook === book
    );
console.log(matchingBook,"matchingBook")
    const matchingSelectType = matchingBook.selectTypes.find(
      (st) => st.selectType === selectType
    );
    const matchingQuizType = matchingSelectType.quizTypes.find(
      (qt) => qt.quizType === quizType
    );

    res.status(200).json({
      message: "Questions retrieved successfully",
      data: {
        category: matchingCategory,
        subCategory: matchingSubCategory,
        chapter: matchingChapter,
        book: matchingBook,
        selectType: matchingSelectType,
        quizType: matchingQuizType,
        
      },
    });
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




// Get All Question with all select type
exports.getQuizByAllSelectType = async (req, res) => {
  try {
    let allQuiz = await Question.find();
    if (allQuiz.length === 0) {
      return res.status(200).json({ message: "No questions found" });
    }
    res
      .status(200)
      .json({ message: "Questions retrieved successfully", data: allQuiz });
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// exports.getQuizBySelectType = async (req, res) => {
// console.log(req.body)
//   try {

//     let allQuiz = await Question.find()
//     if (allQuiz.length === 0) {
//       return res.status(200).json({ message: "No questions found" });
//     }
//     res
//     .status(200)
//     .json({ message: "Questions retrieved successfully", data: allQuiz });
//   } catch (error) {
//     console.error("Error retrieving questions:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.getQuizByTypeAndId = async (req, res) => {
  const { quiztype, selectType, quizId } = req.params;

  try {
    if (!isValidquiztype(quiztype) || !isValidselectType(selectType)) {
      return res.status(400).json({ error: "Invalid quiztype or selectType" });
    }

    const quiz = await Question.findOne({ _id: quizId, selectType, quiztype });

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
  try {
    let newQuiz = new Question(req.body);
    await newQuiz.save();

    console.log(newQuiz, "selectType");

    res.status(201).json({ message: "Quiz created successfully" });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete All Question based on Id

exports.dropQuestionsBasedOnId = async (req, res) => {
  const { quiztype, quizId, selectType } = req.params;

  try {
    if (!isValidquiztype(quiztype) || !isValidselectType(selectType)) {
      return res.status(400).json({ error: "Invalid quiztype or selectType" });
    }

    // Delete the quiz with the specified _id and quizType from the database
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

// Delete All Questions

exports.dropQuestions = async (req, res) => {
  const { quiztype, selectType } = req.params;

  try {
    if (!isValidquiztype(quiztype) || !isValidselectType(selectType)) {
      return res.status(400).json({ error: "Invalid quiztype or selectType" });
    }

    // Delete the quiz with the specified _id, quiztype, and selectType from the database
    const deletedQuiz = await Question.findOneAndDelete({
      quiztype,
      selectType,
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
exports.dropQuestionsBasedOnId = async (req, res) => {
  const { quiztype, quizId, selectType } = req.params;

  try {
    if (!["solo", "one-to-one", "multiple"].includes(quiztype)) {
      return res.status(400).json({ error: "Invalid quiztype" });
    }

    // Delete the quiz with the specified _id and quiztype from the database
    const deletedQuiz = await Question.findOneAndDelete({
      _id: quizId,
      quiztype,
      selectType,
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

// Update a quiz based on the specified ID, quiz type, and screen type
exports.updateQuiz = async (req, res) => {
  const { quiztype, selectType, quizId } = req.params;
  console.log(quiztype, "quizType", selectType, "selectType", quizId, "quizId");

  try {
    if (!isValidquiztype(quiztype) || !isValidselectType(selectType)) {
      return res.status(400).json({ error: "Invalid quiztype or selectType" });
    }

    // Update the quiz with the specified _id, quiztype, and selectType in the database
    const updatedQuiz = await Question.findOneAndUpdate(
      { _id: quizId, quiztype, selectType },
      req.body,
      { new: true }
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

// try {
//   console.log(questionsData, "questionsData");

//   const insertedQuestions = await Question.insertMany({
//     questions: questionsData,
//     answers: answers,
//     timer:otherFields.timer,
//     category:otherFields.category,
//     subCategory:otherFields.subCategory,
//   });

//   res.send({
//     status: "Questions Saved Successfully",
//     data: insertedQuestions,
//   });
// } catch (error) {
//   res.status(500).send({ message: error.message });
// }
