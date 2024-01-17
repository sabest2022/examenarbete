// ----- Imports mongoose

const { Schema, model, models } = require('mongoose');

// ----- Schema to create delivery addresses

const AddressSchema = new Schema({
  street: { type: String },
  zipcode: { type: String },
  city: { type: String },
  country: { type: String }
});

// ----- Schema to create order items

const OrderItemSchema = new Schema({
  plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  price: { type: Number, default: 0 }
});

// ----- Schema to create order

const orderSchema = new Schema({
  orderNumber: {
    type: Number,
    required: true,
    default: Math.floor(Math.random() * 1000000),
  },
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: { type: [OrderItemSchema], required: true },
  totalprice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  address: { type: AddressSchema },
  delivered: { type: Boolean, default: false },
}, { versionKey: false });

// ----- Checks if "Order" model exist in DB, if not, it creates it

const OrderModel = models.Order || model("Order", orderSchema);

// ----- Exports model to controller

module.exports = { OrderModel };