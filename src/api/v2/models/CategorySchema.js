const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: String,
  quizData: [
    {
      quizId: { type: String },
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
    },
  ],
});

categorySchema.pre('save', function (next) {
  this.quizData.forEach((quiz) => {
    if (!quiz.quizId) {
      quiz.quizId = `FPQS-${new mongoose.Types.ObjectId()}`;
    }
  });
  next();
});

module.exports = mongoose.model('Category', categorySchema);
