const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const port = 8000;

const ImageModel = require("./image.model");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.multer());

mongoose
  .connect(
  //Enter you mongo url here
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
      return res.status(200).json({});
    } else {
      console.log(req);
      const newImage = new ImageModel({
        name: req.file.filename,
      });
      newImage
        .save()
        .then(() => {
          console.log("successfully uploaded!");
          return res.status(200).json({});
        })
        .catch((err) => console.log(err));
    }
     return res.status(200).json({});
  });
  return res.status(200).json({});
});

app.listen(port, () => {
  console.log("successfully running server");
});
