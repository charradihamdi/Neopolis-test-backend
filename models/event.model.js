const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});



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
      required: true,
      enum: ["sport", "culture"],
      trim: true
    },
    location: {
      type: PointSchema,
      index: '2dsphere',
      required: true
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