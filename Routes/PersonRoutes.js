const express = require('express')
const router = express.Router();
// Adding Schema 
const Person = require('./../Models/Person.js');


//Create a Person
router.post('/person', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);

        // Save the new data to MongoDB
        const response = await newPerson.save();
        console.log('Data Added');
        res.status(200).json({ message: 'Data added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET ALL Person 
router.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// GET One Person bt id
router.get('/person/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id); //(req.params.id will get :id from req)
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json(person);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update person by ID
router.put('/person/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!person) {
            console.log({Message:'Data Updated Succesfully'});
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json(person);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete person by ID
router.delete('/person/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        console.log({Message:'Data Deleted Succesfully'});
        res.status(204).json({ message: 'User Deleted Succesfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;