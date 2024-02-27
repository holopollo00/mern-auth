import mongoose from "mongoose";

const designsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  idea: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  materials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
    },
  ],
});

const Design = mongoose.model("Design", designsSchema);

export default Design;
