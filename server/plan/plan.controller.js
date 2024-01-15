// ----- Imports model

const { PlanModel } = require("./plan.model");

// ----- Get all plans from DB

async function getplans(req, res, next) {
    try {
        const plans = await planModel.find();
        res.status(200).json(plans);
    } catch (err) {
        res.status(404).json(err);
    };
};

// ----- Get a specific plan by ID

async function getplanID(req, res, next) {
    try {
        const plans = await planModel.findOne({ _id: req.params.id });
        if (plans === null) {
            return res.status(404).json(req.params.id + " not found");
        };
        res.status(200).json(plans);
    } catch (err) {
        res.status(404).json("not found");
    };
};

// ----- Get all plans by the same category

async function getplanByCat(req, res, next) {
    try {
        const plans = await PlanModel.find({ categories: req.params.id });
        res.status(200).json(plans);
    } catch (err) {
        res.status(404).json(err);
    };
};

// ----- Create new plan to DB

async function createplan(req, res, next) {
    try {
        const plan = await PlanModel.create(req.body);
        res.status(201).json(plan);
    } catch {
        res.status(403).json("not found");
    };
};

// ----- Edit a plan and save it in DB

async function editplan(req, res, next) {
    try {
        const updatedData = await PlanModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!updatedData) { return res.status(404).json(req.params.id + " not found") };
        res.status(200).json(updatedData);
    } catch (err) {
        res.status(403).json(err);
    };
};

// ----- Delete a plan 

async function deleteplan(req, res, next) {
    try {
        if ((await PlanModel.findOne({ _id: req.params.id })) === null) {
            return res.status(404).json(req.params.id + " not found");
        };
        await planModel.deleteOne({ _id: req.params.id });
        res.status(204).json(req.params.id + " deleted");
    } catch {
        res.status(404).json(req.params.id + " not found");
    };
};

// ----- Exports functions to router

module.exports = { getplans, getplanID, getplanByCat, createplan, editplan, deleteplan };