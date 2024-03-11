require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

// routes
const binRoutes = require("./routes/bins");
const gondolaRoutes = require("./routes/gondola");
const keyArticleRoutes = require("./routes/keyArticle");
const productHistoryRoutes = require("./routes/productHistory");
const roleRoutes = require("./routes/role");
const userRoutes = require("./routes/UserRoutes");
const acitivityRoutes = require("./routes/activityLog");

//express app
const app = express();

// middleware
app.use(express.json({ limit: "100mb" }));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ROUTES

app.use("/api/user", userRoutes); // User API

app.use("/api/bins", binRoutes);

app.use("/api/gondola", gondolaRoutes);

app.use("/api/keyArticle", keyArticleRoutes);

app.use("/api/history", productHistoryRoutes);

app.use("/api/roles", roleRoutes);

app.use("/api/activity", acitivityRoutes )

// connect to db
// mongoose
//   .connect(process.env.MONG_URI)
//   .then(() => {
//     //listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log(`connected to db and listening on port ${process.env.PORT}!`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// console.log(shelves_db);
try {
  app.listen(process.env.PORT, () => {
    console.log(`connected to db and listening on port ${process.env.PORT}!`);
  });
} catch (error) {
  console.log(error);
}
