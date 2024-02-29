import mongoose from "mongoose";

const designSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pictures: [
    {
      type: String, required: true
    }
  ],
  sizes: [
    {
      type: String,
      required: true,
    },
  ],
  room: {
    type: Number,
  },
  floor: {
    type: Number,
  },
});

const Design = mongoose.model("Design", designSchema);

export default Design;
