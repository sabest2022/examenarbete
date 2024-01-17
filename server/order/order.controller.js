// ----- Imports models

const { OrderModel } = require('./order.model');
const { PlanModel } = require("../plan/plan.model");

// ----- Creates a new order

async function createOrder(req, res, next) {
  try {
    const { customer, orderItems, totalprice, address } = req.body;

    const order = new OrderModel({
      customer: customer,
      orderItems: orderItems,
      totalprice: totalprice,
      date: new Date(), // Use server's date or from req.body
      address: address,
      delivered: false
    });

    // Optionally validate each plan and recalculate the total price
    let recalculatedTotalPrice = 0;
    for (let orderItem of order.orderItems) {
      let plan = await PlanModel.findById(orderItem.plan);
      if (!plan) {
        return res.status(404).json({ message: 'Plan not found' });
      }
      // Recalculate the price for security
      recalculatedTotalPrice += plan.price;
    }

    // Optionally, set totalprice to recalculatedTotalPrice for security
    order.totalprice = recalculatedTotalPrice;

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Error creating order', error: err });
  }
}


// ----- Get user orders or all orders as an admin

async function getAllOrders(req, res) {
  try {
    if (req.session.user.isAdmin) {
      const allOrders = await OrderModel.find().populate("customer");
      return res.status(200).json(allOrders);
    };

    const user = req.session.user._id;
    const orders = await OrderModel.find({ user: user });
    res.status(200).json(orders);

  } catch {
    res.status(404).json("user has no orders yet.");
  };
};

// ----- get a specific user order as admin or a user's own order by ID

async function getOrderId(req, res) {
  try {
    if (req.session.user.isAdmin) {
      const order = await OrderModel.findOne({ _id: req.params.id }).populate("customer");
      if (!order) { return res.status(404).json(req.params.id + " not found") };
      return res.status(200).json(order);
    };

    const user = req.session.user._id;
    const orders = await OrderModel.find({ user: user }).populate("customer");
    const order = orders.find(element => (req.params.id == element._id));

    if (!order) { return res.status(404).json(req.params.id + " not found") };
    if (!(order.customer._id == user)) {
      return res.status(403).json("not user's order!")
    };

    res.status(200).json(order);

  } catch {
    res.status(404).json("user has no orders yet.");
  };
};

// ----- Marks orders as shipped if admin

async function isDelivered(req, res) {
  const order = await OrderModel.findById({ _id: req.params.id });
  order.shipped = true;
  await order.save();
  res.status(200).json(order);
};

// ----- Exports functions to router

module.exports = { createOrder, getAllOrders, getOrderId, isDelivered };