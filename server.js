const express = require('express')
const app = express()
const db = require('./db.js');
// Adding Schema 
const Person = require('./Models/Person.js');
// Adding Body Parser
const bodyparser = require('body-parser');
app.use(bodyparser.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

// Importing person Routes 
const PersonRoutes = require('./Routes/PersonRoutes.js');
app.use('/', PersonRoutes);  // Use the Router

app.listen(3000, () => {
  console.log(' Node Server Started');
});