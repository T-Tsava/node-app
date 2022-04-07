require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

//connection to db

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    app.listen(process.env.PORT || 4000, () => console.log("Server Up and running"));
});
const database = mongoose.connection;

database.on('error', (error) =>{
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

app.use( function(req, res, next) {
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
      return res.sendStatus(204);
    }
    return next();
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
      return res.sendStatus(204);
    }
    return next();
});
app.use('/api/tasks', routes);


