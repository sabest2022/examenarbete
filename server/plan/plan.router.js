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
    .post("/", validate(planJoiSchema), createplan)
    .get("/:id", getplanID)
    .put("/:id", validate(planJoiSchema), editplan)
    .delete("/:id", deleteplan)

// ----- Exports router

module.exports = { planRouter };