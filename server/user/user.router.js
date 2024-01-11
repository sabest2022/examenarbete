const express = require("express");
const {
  googleLogin,
  googleLogout,
  googleAuth,
  getUser,
} = require("./user.controller");
console.log('userRouter triggers!')
const userRouter = express
  .Router()
  .post("/google-login", googleLogin)
  .post("/google-logout", googleLogout)
  .get("/google-authorize", googleAuth)
  .get("/user/:id", getUser);

module.exports = { userRouter };
