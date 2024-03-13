import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
    {
        long: {
            type: Number,
            required: true
        },
        wide: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Size = mongoose.model("Size", sizeSchema);

export default Size;
