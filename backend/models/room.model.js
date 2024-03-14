const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        room:
        {
            bedRoom: {
                type: Number,
                required: true
            },
            restRoom: {
                type: Number,
                required: true
            }
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);

