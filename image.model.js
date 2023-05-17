const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ImageSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

const ImageModel = model("ImageModel", ImageSchema);

module.exports = ImageModel;
