const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  IdUser: String,
  state: String,
  Category: String,
  images: [Object],
  dateCreated: Date,
  title: string,
  price: Number,
  priceNegotiate: Boolean,
  description: String,
  views: String,
  status: String,
});

const modelName = "State";

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, userSchema);
}
