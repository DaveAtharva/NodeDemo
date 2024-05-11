const express = require('express')
const app = express()
const db = require('./db.js');
require('dotenv').config();
const passport =require('./authentication.js');

// Adding Body Parser
const bodyparser = require('body-parser');
app.use(bodyparser.json());


//Middleware Function
// const logRequest = (req, res, next) => {
//   console.log(`${new Date().toLocaleString()}, URL: ${req.originalUrl}`);
//   next();
// }
// app.use(logRequest);

//Authentication Code 
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', localAuthMiddleware, function (req, res) {
  res.send('Hello World')
})


// Importing person Routes 
const PersonRoutes = require('./Routes/PersonRoutes.js');
app.use('/', PersonRoutes);  // Use the Router

// Hiding Port Number details using .env file
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Node Server Started');
});

