// ----- Imports models

const { OrderModel } = require('./order.model');
const { PlanModel } = require("../plan/plan.model");
const { configDotenv } = require('dotenv');
const CLIENT_URL = "http://localhost:5173"


// ----- Creates a new order
const stripe = require("stripe")(process.env.STRIPE_KEY);

// ... Other dependencies and middleware ...

// const createCheckoutSession 
const createOrder = async (req, res) => {
  // console.log('Const Stripe:', stripe);
  const { customer, orderItems, totalprice, stripeCustomerId, customerName, customerEmail } = req.body;

  try {
    //this line has to be change and implemen on a way that we can retrive the Stripe customerid from our database, for that should we register all user on stripe and simultenously on our databse.
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: orderItems.map(item => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100, // assuming item.price is in dollars
          },
          quantity: 1,
        };
      }),

      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,

    });

    res.status(200).json({
      url: session.url,
      sessionId: session.id,
      paymentStatus: session.payment_status
    });
  } catch (error) {

    console.log(error.message);
    res.status(400).send("Internam server ERROR");
  }
};
// ----- Get user orders or all orders as an admin

async function getAllOrders(req, res) {

  try {
    const orders = await OrderModel.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user orders", error: error.message });
  }
}
async function getUserAllOrders(req, res) {
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

async function isDelivered(req, res) {
  const order = await OrderModel.findById({ _id: req.params.id });
  order.shipped = true;
  await order.save();
  res.status(200).json(order);
};

// ----- Exports functions to router

module.exports = { createOrder, getAllOrders, getOrderId, isDelivered, getUserAllOrders };