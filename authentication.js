//Contains all files related to Authentication
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person=require('./Models/Person.js');

// Authentication using Passsport - Username & Password
passport.use(new localStrategy(async (USERNAME, password , done)=>{
    try{
        //  console.log('Received Credentials : ' , USERNAME , password);
       const user = await Person.findOne({username : USERNAME}); // searching USERNAME in database
       if(!user){
         return done(null , false , {message : 'Incorrect Username'});
       }
       //Comparing Hasshed Password 
       const isPasswordMatched = user.comparePassword(password);
       if(isPasswordMatched){
         return done(null,user);
       }
       else{
         return done(null , false , {message : 'Incorrect Password'});
       }
 
    }catch(error){
           console.log({message : 'Error in Authentication'});
           return done(error);
    }
 }))

module.exports = passport;