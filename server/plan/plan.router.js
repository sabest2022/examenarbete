// ----- Imports express

const express = require("express");

// ----- Imports functions from controller and middlewere

const { getplans, getplanID, getplanByCat, createplan, editplan, deleteplan } = require("./plan.controller");
const { isAdmin, isLoggedIn, validate } = require("../middleware/middleware");

// ----- Imports validation schema

const { planJoiSchema } = require("./plan.model");

// ----- Creates router

const planRouter = express
    .Router()

    .get("/", getplans)
    .get("/:id", getplanID)
    .post("/", isLoggedIn, isAdmin, validate(planJoiSchema), createplan)
    .put("/:id", isLoggedIn, isAdmin, validate(planJoiSchema), editplan)
    .delete("/:id", isLoggedIn, isAdmin, deleteplan)

// ----- Exports router

module.exports = { planRouter };