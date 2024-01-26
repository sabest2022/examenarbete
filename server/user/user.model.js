// const mongoose = require("mongoose");
const { Schema, model, models } = require("mongoose");
const Joi = require("joi");
// const UserSchema = new mongoose.Schema({
//   name: { type: String },
//   email: { type: String },
//   imageUrl: { type: String },
//   balance: { type: Number },
// });
const AddressSchema = new Schema({
  street: { type: String, required: false, default: '' },
  city: { type: String, required: false, default: '' },
  zipcode: { type: String, required: false, default: '' },
  country: { type: String, required: false, default: '' }
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  stripeCustomerId: { type: String, default: null },
  imageUrl: { type: String, required: false, default: 'defaultValue' },
  password: { type: String, required: false, default: 'dfhdthdthgdhfgnghfgfhnfghnbfgffrrtjkuk' },
  telephone: { type: Number, required: false, default: 0 },
  isAdmin: { type: Boolean, required: false, default: false },
  balance: { type: Number, required: false, default: 0 },
  deliveryAddress: [{ type: AddressSchema, required: true }] // Wrap AddressSchema in an array
});

const userJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(), // Use email validator for email field
  stripeCustomerId: Joi.string(),
  imageUrl: Joi.string(),
  password: Joi.string().min(5).max(18),
  telephone: Joi.number(),
  isAdmin: Joi.boolean(),
  balance: Joi.number(),
  deliveryAddress: Joi.array().items(
    Joi.object({
      street: Joi.string(),
      city: Joi.string(),
      zipcode: Joi.string()
    })
  ).required()
});
const UserModel = models.user || model("User", UserSchema);
module.exports = { UserModel, userJoiSchema };