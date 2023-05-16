const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const port = 8000;

const ImageModel = require("./image.model");
const { log } = require("console");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://dini:dini1234@image.lkt8ym9.mongodb.net/image?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err, "it has an error"));

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

app.get("/", (req, res) => {
  res.send("upload file");
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new ImageModel({
        name: {
          data: req.file.filename,
          contentType: "image/png/jpg",
        },
      });
      newImage
        .save()
        .then(() => "successfully uploaded!")
        .catch((err) => console.log(err));
    }
  });
});

app.listen(port, () => {
  console.log("successfully running server");
});
