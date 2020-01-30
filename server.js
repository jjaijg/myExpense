const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const app = express();

// Routes
const transRoute = require("./routes/api/transactions");
const userRoute = require("./routes/api/users");
const authRoute = require("./routes/api/auth");

// setup middleware for body parsing
app.use(express.json());

// mongodb+srv://admin:<password>@mycluster-qckqe.mongodb.net/test?retryWrites=true&w=majority --> Atlas (dev db)

// mongodb://<dbuser>:<dbpassword>@ds263368.mlab.com:63368/myexpense --> mlab

// setup for db connection and server
const port = process.env.PORT || 5000;
const mongoUser = process.env.mongoUser;
const mongoPw = process.env.mongoPw;
const mongoURI = `mongodb+srv://${mongoUser}:${mongoPw}@mycluster-qckqe.mongodb.net/test?retryWrites=true&w=majority`;
// const mongoURI = `mongodb://${mongoUser}:${mongoPw}@ds263368.mlab.com:63368/myexpense`;

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

// Serve static assests if in prod
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start server on port
app.listen(port, () => console.log(`Server started on ${port}`));
