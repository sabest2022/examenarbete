// ----- Imports epress and express async errors

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
require("express-async-errors");
const cookieSession = require("cookie-session");
const { handleWebhook } = require('./webhook');
const { planRouter } = require("./plan/plan.router");
const { userRouter } = require("./user/user.router");
const { orderRouter } = require("./order/order.router");
const { contactRouter } = require("./contact/contact.router");

const app = express();

// Raw body parser for Stripe webhook
app.post("/webhook", bodyParser.raw({ type: 'application/json' }), handleWebhook);

// Apply cors
app.use(cors({ origin: [true, 'http://localhost:5173'], credentials: true }));

// Creates the cookies
app.use(
    cookieSession({
        secret: "secret",
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    })
);

// Use JSON body parser for other routes
app.use(bodyParser.json());

// Define routes
app.use("/api/plans", planRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/contact", contactRouter);
// ----- Error handlers

app.use((req, res) => {
    res.status(404).json("Not found");
});
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json(err.message);
});

// ----- Exports app to server

module.exports = { app };