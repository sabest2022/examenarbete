const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  imageUrl: { type: String },
  balance: { type: Number },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;


// const AddressSchema = new Schema({
//   street: { type: String, required: false },
//   city: { type: String, required: false },
//   zipcode: { type: String, required: false }
// });

// const UserSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   imageUrl: { type: String, required: false },
//   password: { type: String, required: false },
//   telephone: { type: Number, required: false },
//   isAdmin: { type: Boolean, required: true },
//   balance: { type: Number, required: false },
//   deliveryAddress: [{ type: AddressSchema, required: true }] // Wrap AddressSchema in an array
// });

// const userJoiSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(), // Use email validator for email field
//   imageUrl: Joi.string(),
//   password: Joi.string().min(5).max(18),
//   telephone: Joi.number(),
//   isAdmin: Joi.boolean(),
//   balance: Joi.number(),
//   deliveryAddress: Joi.array().items(
//     Joi.object({
//       street: Joi.string(),
//       city: Joi.string(),
//       zipcode: Joi.string()
//     })
//   ).required()
// });