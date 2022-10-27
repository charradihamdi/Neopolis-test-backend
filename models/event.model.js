const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: false
    },
    title: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required:true,
      enum: ["sport", "culturel"],
      trim: true
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('event', eventSchema);