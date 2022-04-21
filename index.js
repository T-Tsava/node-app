require('dotenv').config();
const express = require('express');
const cors = require('cors');
const redis = require('redis');
require('./auth/auth');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const app = express();

app.use(cors());
app.get("/", cors(), (req,res) => {
    res.send("Server is successfully running");
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = redis.createClient({
    legacyMode: true
  });
  client.on("error", (error) => {
   console.error(error);
  });
  client.connect();

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 3005;

//connection to db

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    app.listen(PORT, () => console.log("Server Up and running"));
});

const database = mongoose.connection;

database.on('error', (error) =>{
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});



