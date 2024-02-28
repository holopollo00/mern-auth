import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);

export default Material;
