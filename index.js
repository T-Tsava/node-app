const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

app.set("view engine", "ejs");

dotenv.config();

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

//connection to db  
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    app.listen(3000, () => console.log("Server Up and running"));
});

