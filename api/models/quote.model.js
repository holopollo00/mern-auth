import mongoose from "mongoose";

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

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
