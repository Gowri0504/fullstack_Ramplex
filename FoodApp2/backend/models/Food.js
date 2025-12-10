const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Food", FoodSchema);
