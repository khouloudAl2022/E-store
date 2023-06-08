const express = require("express");
const connectDb = require("./config/connectDb");
const productRoutes = require("./routes/product");
// const user = require("./models/user");
const userRoutes = require("./routes/user");
const cors = require("cors");
require("dotenv").config();
const app = express();
connectDb();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" }));
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.listen(process.env.PORT, () => {
  console.log(`your server is running on port ${process.env.PORT}`);
});
