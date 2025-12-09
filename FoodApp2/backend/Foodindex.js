const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const FoodModel = require('./models/Food');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error: ", err));

app.get('/', (req, res) => {
    res.send("Hello from Backend");
});
app.post('/insert', async (req, res) => {
    const foodname = req.body.foodname;
    const daySinceIAte = req.body.daySinceIAte;

    const food = new FoodModel({ foodname, daySinceIAte });

    try {
        await food.save();
        res.status(201).send("Data Inserted");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error Inserting Data");
    }
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await FoodModel.findByIdAndDelete(id);
        res.status(200).send("Data Deleted");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error Deleting Data");
    }
});

app.put('/update', async (req, res) => {
    try {
        const { id, newFoodName } = req.body;
        await FoodModel.findByIdAndUpdate(id, { foodname: newFoodName });
        res.status(200).send("Data Updated");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error Updating Data");
    }
});

app.get('/read', async (req, res) => {
    try {
        const foods = await FoodModel.find({});
        res.status(200).json(foods);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error Reading Data");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});
