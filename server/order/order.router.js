// ----- Imports express

const express = require('express');

// ----- Imports function from controller and middlewere

const { createOrder, getAllOrders, getOrderId, isDelivered } = require('./order.controller');
const { isAdmin, isLoggedIn } = require("../middleware/middleware");

// ----- Creates router

const orderRouter = express
  .Router()
  // ----- Creates endpoints

  .get('/', getAllOrders)
  .get('/:id', getOrderId)
  .post('/', isLoggedIn, createOrder)
  // isLoggedIn,
  .put('/:id', isDelivered)
// , isAdmin

// ----- Exports router

module.exports = { orderRouter };