import mongoose from "mongoose";

const partSchema = new mongoose.Schema(
  {
    rawPart: {
      type: Number,
      required: true,
    },
    finishingPart: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const Part = mongoose.model("Part", partSchema);

export default Part;
