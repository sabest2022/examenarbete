// ----- Imports joi (validation)

const Joi = require("joi");

// ----- Imports mongoose

const { Schema, model, models } = require("mongoose");

// ----- Schema to create products

const planSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    responsive: { type: Boolean, required: true },
    pages: { type: Number, required: true }
}, { versionKey: false });

// ----- Validates data before creating product

const planJoiSchema = Joi.object(
    {
        _id: Joi.string(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string(),
        responsive: Joi.boolean().required(),
        pages: Joi.number().required()
    }
);

// ----- Checks if "Product" model exist in DB, if not, it creates it

const PlanModel = models.plan || model("Plan", planSchema);

// ----- Exports model to controller and Joi Schema to router

module.exports = { PlanModel, planJoiSchema };