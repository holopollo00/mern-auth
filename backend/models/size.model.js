const mongoose = require('mongoose');

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

module.exports = mongoose.model("Size", sizeSchema);

