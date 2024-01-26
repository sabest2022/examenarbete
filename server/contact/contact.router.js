const express = require("express");
const {
    register
} = require("./contact.controller");

const contactRouter = express
    .Router()
    .post("/", register)


module.exports = { contactRouter };
