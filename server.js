const express = require('express')
const app = express()
const db = require('./db.js');
require('dotenv').config();

// Adding Body Parser
const bodyparser = require('body-parser');
app.use(bodyparser.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})


//Middleware Function
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()}, URL: ${req.originalUrl}`);
  next();
}

app.use(logRequest);

// Importing person Routes 
const PersonRoutes = require('./Routes/PersonRoutes.js');
app.use('/', PersonRoutes);  // Use the Router

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Node Server Started');
});

//Comment added for testing Git