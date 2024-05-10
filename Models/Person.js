const mongoose = require('mongoose');

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

    }
})

// Creating a Model/Schema 
const Person = mongoose.model('Person', PersonSchema);
module.exports=Person;