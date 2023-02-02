const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");

const app = express();

app.use("/upload", express.static("upload"));

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./upload");
  },
  filename: function (request, file, callback) {
    var temp_file_arr = file.originalname.split(".");
    var temp_file_name = temp_file_arr[0];
    var temp_file_extension = temp_file_arr[1];
    callback(
      null,
      temp_file_name + "-" + Date.now() + "." + temp_file_extension
    );
  },
});

const upload = multer({ storage: storage });

app.post("/mute-profanity", upload.single("audioFile"), (req, res) => {
  const inputFile = req.file.path;
  const outputFile = `${inputFile}.muted.mp3`;

  console.log(inputFile, outputFile);
  const command = `monkeyplug -i ${inputFile} -o ${outputFile}`;
  if (inputFile === undefined) {
    return res.status(400).send({ error: "No file provided" });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }

    if (stderr) {
      return res.status(500).send({ error: stderr });
    }

    res.sendFile(outputFile, (sendFileError) => {
      if (sendFileError) {
        return res.status(500).send({ error: sendFileError.message });
      }
    });
  });
});

module.exports = app;
