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
  const userId = req.session.user._id; // Get user ID from session

  try {
    const orders = await OrderModel.find({ customer: userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user orders", error: error.message });
  }
}



// ----- get a specific user order as admin or a user's own order by ID
async function getOrderId(req, res) {
  const orderId = req.params.id; // Get order ID from route parameters

  try {
    const order = await OrderModel.findById(orderId)
      .populate('customer', 'name email') // Adjust fields as needed
      .populate('orderItems.plan', 'title price'); // Adjust fields as needed

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order", error: error.message });
  }
}

// async function getOrderId(req, res) {
//   try {
//     const userId = req.session.user._id;
//     const isAdmin = req.session.user.isAdmin;
//     const orderId = req.params.id;

//     let order;

//     if (isAdmin) {
//       order = await OrderModel.findById(orderId)
//         .populate('customer', 'name email') // Adjust fields as needed
//         .populate('orderItems.plan', 'title price'); // Adjust fields as needed
//     } else {
//       order = await OrderModel.findOne({ _id: orderId, customer: userId })
//         .populate('customer', 'name email') // Adjust fields as needed
//         .populate('orderItems.plan', 'title price'); // Adjust fields as needed
//     }

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving order", error: error.message });
//   }
// }


// ----- Marks orders as shipped if admin

async function isDelivered(req, res) {
  const order = await OrderModel.findById({ _id: req.params.id });
  order.shipped = true;
  await order.save();
  res.status(200).json(order);
};

// ----- Exports functions to router

module.exports = { createOrder, getAllOrders, getOrderId, isDelivered };