const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const port = 8000;

const ImageModel= require("./image.model");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://dini:dini1234@image.lkt8ym9.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
    .then(() => console.log("Database connected!"))
  .catch((err)=>console.log(err,"it has an error"));

const Storage = multer.diskStorage({
       destination:'uploads'
   })

app.get("/", (req, res) => {
    res.send("upload file");
});

app.listen(port, () => {
    console.log("successfully running server");
})
