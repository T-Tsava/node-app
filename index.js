require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

//connection to db  
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    app.listen(3000, () => console.log("Server Up and running"));
});
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();
app.use(express.json());
app.use('/api', routes);