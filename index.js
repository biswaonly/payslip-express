require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/user");
const payslipRoutes = require("./routes/payslip");

app.use("/api/user", userRoutes);
app.use("/api/payslip", payslipRoutes);

app.listen(3333, () => {
  console.log(`Server Started at ${3333}`);
});
