const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

// Routes
const transRoute = require("./routes/api/transactions");
const userRoute = require("./routes/api/users");
const authRoute = require("./routes/api/auth");

// setup middleware for body parsing
app.use(express.json());

// mongodb+srv://admin:<password>@mycluster-qckqe.mongodb.net/test?retryWrites=true&w=majority --> Atlas (dev db)

// setup for db connection and server
const port = process.env.PORT || 5000;
const mongoUser = process.env.mongoUser || config.get("mongoUser");
const mongoPw = process.env.mongoPw || config.get("mongoPw");
const mongoURI = `mongodb+srv://${mongoUser}:${mongoPw}@mycluster-qckqe.mongodb.net/test?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected!!!"))
  .catch(err => console.log(err));

// Routes for api
app.use("/api/transactions", transRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

// Start server on port
app.listen(port, () => console.log(`Server started on ${port}`));
