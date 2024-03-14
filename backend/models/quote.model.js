const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    design: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Design",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    materials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
      },
    ],
    quantity: {
      type: Number,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);

