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
  sizeId:  {
    type: String,
    required: true,
  },
  room: {
    bedRoom: {
      type: Number,
      required: true,
    },
    restRoom: {
      type: Number,
      required: true,
    },
  },
  floor: {
    type: Number,
  },
});

const Design = mongoose.model("Design", designSchema);

export default Design;
