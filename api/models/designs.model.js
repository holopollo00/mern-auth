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
  area: {
    type: String,
  },
});

const Design = mongoose.model("Design", designsSchema);

export default Design;
