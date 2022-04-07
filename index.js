require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
console.log('im here');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use( function(req, res, next) {
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
      return res.sendStatus(204);
    }
    return next();
});

app.use('/api/tasks', routes);

const PORT = process.env.PORT || 3005;

//connection to db

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    app.listen(PORT, () => console.log("Server Up and running"));
});

const database = mongoose.connection;

database.on('error', (error) =>{
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});



