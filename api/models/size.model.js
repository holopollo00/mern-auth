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
        rawPart: {
            type: Number,
        },
        finishingPart: {
            type: Number,
        },
        image: {
            type: String,
            required: true,
        },
        materials: [
            {
                _id: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },

            },
        ],
    },
    { timestamps: true }
);

const Size = mongoose.model("Size", sizeSchema);

export default Size;
