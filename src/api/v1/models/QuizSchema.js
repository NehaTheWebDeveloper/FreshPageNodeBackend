const mongoose = require("mongoose");
const uuid = require("uuid");
const { Schema } = mongoose;

// const QuestionModel = new Schema({
//   selectTypes: [
//     {
//       selectType: { type: String },
//       quizTypes: [
//         {
//           quizType: { type: String },
//           quizData: [
//             {
//               quizId: {
//                 type: String,
//                 default: () => {
//                   const fixedCode = "FPQS-";
//                   const uuidValue = uuid.v4();
//                   return fixedCode + uuidValue;
//                 },
//               },
//               quizName: { type: String, default: "TryAndWin" },
//               category: { type: [String] },
//               subCategory: { type: [String] },
//               quizOptions: [
//                 {
//                   optionId: { type: Number },
//                   optionText: { type: String },
//                 },
//               ],
//               questions: [
//                 {
//                   id: { type: Number },
//                   question: { type: String },
//                   options: { type: [String] },
//                 },
//               ],
//               answers: { type: [String], default: [] },
//               timer: { type: [Number] },
//               createdAt: { type: Date, default: Date.now },
//             },
//           ],
//         },
//       ],
//     },
//   ],
// });




const QuestionModel = new Schema({
  categories:[
    {
      categoryName: { type: String, required: true },
      subCategories :[
        {
          subCategory :{ type: String, required: true },
          chapters :[
            {
              chapter :{ type: String, required: true },
              booksMusicAudioBooks:[
                {
                  booksMusicAudioBook :{ type: String, required: true },
                  selectTypes: [
                    {
                      selectType: { type: String, required: true },
                      quizTypes: [
                        {
                          quizType: { type: String, required: true },
                          quizData: [
                            {
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
                            },
                          ],
                        },
                      ],
                    },
                  ],

                }
              ]
            }
          ]
        }
      ]
    }

  ]
});

module.exports = mongoose.model("Question", QuestionModel);
// selectTypes: [
//     {
//       selectType: { type: String, required: true },
//       quizTypes: [
//         {
//           quizType: { type: String, required: true },
//           quizData: [
//             {
//               quizId: { type: String, default: () => `FPQS-${mongoose.Types.ObjectId()}` },
//               quizName: { type: String, default: "TryAndWin" },
//               category: { type: [String] },
//               subCategory: { type: [String] },
//               quizOptions: [
//                 {
//                   optionId: { type: Number },
//                   optionText: { type: String },
//                 },
//               ],
//               questions: [
//                 {
//                   id: { type: Number },
//                   question: { type: String },
//                   options: { type: [String] },
//                 },
//               ],
//               answers: { type: [String], default: [] },
//               timer: { type: [Number] },
//               createdAt: { type: Date, default: Date.now },
//             },
//           ],
//         },
//       ],
//     },
//   ],