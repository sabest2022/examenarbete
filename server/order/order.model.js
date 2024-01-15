// ----- Imports mongoose

const { Schema, model, models } = require('mongoose');

// ----- Schema to create delivery addresses

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true }
});

// ----- Schema to create order items

const orderItemSchema = new Schema({
  plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },

  price: { type: Number, default: 0 }
});

// ----- Schema to create order

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [orderItemSchema],
  date: { type: Date, default: Date.now },
  address: [AddressSchema],
  delivered: { type: Boolean, default: false },
}, { versionKey: false });

// ----- Checks if "Order" model exist in DB, if not, it creates it

const OrderModel = models.Order || model("Order", orderSchema);

// ----- Exports model to controller

module.exports = { OrderModel };