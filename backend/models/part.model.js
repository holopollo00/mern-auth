const mongoose = require('mongoose');

const partSchema = new mongoose.Schema(
  {
    rawPart: {
      type: Number,
      required: true,
    },
    finishingPart: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Part", partSchema);

