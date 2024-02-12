require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");


// routes
const binRoutes = require("./routes/bins")
const gondolaRoutes = require("./routes/gondola")
const keyArticleRoutes = require("./routes/keyArticle")
const productHistoryRoutes = require("./routes/productHistory")
const roleRoutes = require("./routes/role")
const userRoutes = require("./routes/UserRoutes")


//express app
const app = express();

// middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ROUTES

app.use("/api/user", userRoutes) // User API

app.use("/api/bins", binRoutes);

app.use("/api/gondola", gondolaRoutes);

app.use("/api/keyArticle", keyArticleRoutes);

app.use("/api/history", productHistoryRoutes);

app.use("/api/roles", roleRoutes);

// connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and listening on port ${process.env.PORT}!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
