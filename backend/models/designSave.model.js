const mongoose = require("mongoose");

const designSaveSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    process: {
      type: Number,
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
      },
    },
    floor: {
      type: Number,
      required: true,
    },
    materials: {
      door: {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
      floorTitle: {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
      paintWall: {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
      roof: {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
      wallTitle: {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
      window: {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    },
    status: {
      id: {
        type: String,
        default: "Default",
      },
      name: {
        type: String,
        default: "Chưa xử lý",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DesignSave", designSaveSchema);
