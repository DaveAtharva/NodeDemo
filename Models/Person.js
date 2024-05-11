const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const PersonSchema = new mongoose.Schema({
    name : {
        type: String ,
        required : true
    },
    age : {
        type : Number,
        required : true
        // ,
        // enum:[10 , 15 , 20]
        // unique : true,
        // default :0
    },
    username : {
        required:true,
        type : String
    },
    password : {
        required:true,
        type : String
    } 
})

// This function will execute just before Calling Save methode:
PersonSchema.pre('save', async function(next) {
    try {
        // Get the person object being saved
        const person = this;

        // Hash the password only if it has been modified
        if (!person.isModified('password')) {
            return next();
        }

        // Generate Salt
        const salt = await bcrypt.genSalt(10); // 10 is the number of rounds

        // Hash Password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Assign the hashed password to the person object
        person.password = hashedPassword;

        // Call the next middleware
        next();
    } catch (error) {
        // Pass the error to the next middleware
        return next(error);
    }
});


// Function to Comparing Hashed Password
PersonSchema.methods.comparePassword= async (candidatepassword)=>{
    try{
        //Match Password uploaded by user and Password stored in DB 
        const isMatch = await bcrypt.compare(candidatepassword , this.password);
        return isMatch;
    }catch(err){
            throw err;
    }
} 
// Creating a Model/Schema 
const Person = mongoose.model('Person', PersonSchema);
module.exports=Person;