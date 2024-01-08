const express = require("express");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));