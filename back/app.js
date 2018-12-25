var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
const port = process.env.PORT || 3000;
const path = require("path");

var app = express();

//paths
const db = require("./server/config/config.js").mongodbURL;
const userAPI = require("./server/api/user.api");

//@access controls------------
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  next();
});

//middlewares
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(express.static(path.join(__dirname, "server/templates")));
app.use(cors());

//db connect---
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb connected succersfully"))
  .catch(err => console.log(err));

//routes---
app.use("/user", userAPI);

app.listen(port, () => console.log(`server is running at :${port}`));
