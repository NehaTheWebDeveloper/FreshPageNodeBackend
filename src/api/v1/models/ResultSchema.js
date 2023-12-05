const mongoose = require("mongoose");
const { Schema } = mongoose;

const ResultSchema = new Schema({
//   quizName: "",
//   category: ["cat1", "cat2", "cat3"],
//   subCategory: ["subCat1", "subCat12", "subCat13"],
//   bookAudio: "",
//   amount: 0,
//   timer: [1, 2, 3, 4, 5],
});
module.exports = mongoose.model("Result", ResultSchema);
// {
//     'selectTypes': {
//       $elemMatch: {
//         'selectType': selectType,
//         'quizTypes.quizType': quizType
//       }
//     }
//   }






// exports.getQuizBySelectType = async (req, res) => {
//     const { quizType, selectType } = req.params;
  
//     try {
//       if (!isValidquiztype(quizType) || !isValidselectType(selectType)) {
//         return res.status(400).json({ error: "Invalid quizType or selectType" });
//       }
  
//       // Use Mongoose aggregation to filter the data
//       const filteredQuiz = await Question.aggregate([
//         {
//           $unwind: "$selectTypes",
//         },
//         {
//           $unwind: "$selectTypes.quizTypes",
//         },
//         {
//           $match: {
//             "selectTypes.selectType": selectType,
//             "selectTypes.quizTypes.quizType": quizType,
//           },
//         },
//         {
//           $project: {
//             _id: 0, // Exclude _id field
//             selectTypes: 1, // Include the filtered selectTypes field
//           },
//         },
//       ]);
  
//       if (filteredQuiz.length === 0) {
//         return res.status(404).json({ message: "No questions found" });
//       }
  
//       res.status(200).json({
//         message: "Questions retrieved successfully",
//         data: filteredQuiz[0], // Assuming you only want the first matching document
//       });
//     } catch (error) {
//       console.error("Error retrieving questions:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   };