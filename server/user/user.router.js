const express = require("express");
const {
  googleLogin,
  googleLogout,
  googleAuth,
  getAllUser,
  getUser,
  editUser
} = require("./user.controller");

const userRouter = express
  .Router()
  .post("/google-login", googleLogin)
  .post("/google-logout", googleLogout)
  .get("/google-authorize", googleAuth)
  .get("/username/:id", getUser)
  .get("/", getAllUser)
  .put("/:id", editUser)

module.exports = { userRouter };
