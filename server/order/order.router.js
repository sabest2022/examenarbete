// ----- Imports express

const express = require('express');

// ----- Imports function from controller and middlewere

const { createOrder, getAllOrders, getOrderId, isShipped } = require('./order.controller');
const { isAdmin, isLoggedIn } = require("../middleware/middleware");

// ----- Creates router

const orderRouter = express
  .Router()
  // ----- Creates endpoints

  .get('/', isLoggedIn, getAllOrders)
  .get('/:id', isLoggedIn, getOrderId)
  .post('/', isLoggedIn, createOrder)
  .put('/:id', isAdmin, isShipped)

// ----- Exports router

module.exports = { orderRouter };