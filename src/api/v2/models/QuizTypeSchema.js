const mongoose = require('mongoose');

// Define the schema for quizData
const quizDataSchema = new mongoose.Schema({
  quizId: { type: String, default: () => `FPQS-${mongoose.Types.ObjectId()}` },
  quizName: { type: String, default: "TryAndWin" },
  category: { type: [String] },
  subCategory: { type: [String] },
  quizOptions: [
    {
      optionId: { type: Number },
      optionText: { type: String },
    },
  ],
  questions: [
    {
      id: { type: Number },
      question: { type: String },
      options: { type: [String] },
    },
  ],
  answers: { type: [String], default: [] },
  timer: { type: [Number] },
  createdAt: { type: Date, default: Date.now },
  selectType: { type: mongoose.Schema.Types.ObjectId, ref: 'SelectType' }, // Reference to SelectType
});

// Define the schema for quizType
const QuizTypeSchema = new mongoose.Schema({
  quizType: { type: String, required: true },
  quizData: [quizDataSchema],
});

module.exports = mongoose.model('QuizType', QuizTypeSchema);
