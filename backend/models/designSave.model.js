const mongoose = require('mongoose');

const designSaveSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    rawPart: {
        type: Number,
        required: true,
    },
    finishingPart: {
        type: Number,
        required: true,
    },
    wide: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
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
        }
    },
    floor: {
        type: Number,
        required: true, 
    },
    materials: {
        door: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MaterialSave",
        }, 
        floorTitle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MaterialSave",
        }, 
        paintWall: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MaterialSave",
        }, 
        roof: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MaterialSave",
        }, 
        wallTitle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MaterialSave",
        },
        window: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MaterialSave",
        }
    },
});

module.exports = mongoose.model("DesignSave", designSaveSchema);

