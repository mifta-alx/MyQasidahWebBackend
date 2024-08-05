const mongoose = require("mongoose");
const Kitab = mongoose.Schema(
  {
    title: {
      type: String,
    },
    title_arabic: {
      type: String,
    },
    pengarang: {
      type: String,
    },
    page: [
      {
        parent: {
          type: String,
        },
        text_of_page: [
          {
            text: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Kitab", Kitab);
