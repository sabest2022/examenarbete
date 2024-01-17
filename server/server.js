// const express = require("express");

// const cookieSession = require("cookie-session");
const { app } = require('./app');
require("dotenv").config();
// const { userRouter } = require("./user/user.router");
const database = require("./database/config");
// const app = express();
// app.use(express.json());
// app.use(cors({ origin: true, credentials: true }));
// app.use(
//     cookieSession({
//         name: "session",
//         keys: ["aVeryS3cr3tK3y"],
//         maxAge: 1000 * 60, // 24 Hours
//         sameSite: "strict",
//         httpOnly: true,
//         secure: false,
//     })
// );
// app.use("/api/users", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 