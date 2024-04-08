require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");

mongoose.connect(process.env.DATABASE);

mongoose.Promise = global.Promise;
mongoose.connection.on("error", (error) => {
  console.log("Error: ", error.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload());

server.use(express.static(__dirname + "/public"));

server.use("/", apiRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.BASE}`);
});
