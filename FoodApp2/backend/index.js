const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const TodoModel = require('./models/Todo');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error: ", err));

app.get('/', (req, res) => {
    res.send("Hello from Todo Backend");
});

app.post('/insert', async (req, res) => {
    const text = req.body.text;
    const completed = req.body.completed || false;

    const todo = new TodoModel({ text, completed });

    try {
        await todo.save();
        res.status(201).send("Todo Inserted");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error Inserting Todo");
    }
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await TodoModel.findByIdAndDelete(id);
        res.status(200).send("Todo Deleted");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error Deleting Todo");
    }
});
app.put('/update', async (req, res) => {
    try {
        const { id, newText, completed } = req.body;

        await TodoModel.findByIdAndUpdate(
            id,
            { text: newText, completed: completed },
            { new: true }
        );

        res.status(200).send("Todo Updated");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error Updating Todo");
    }
});

app.get('/read', async (req, res) => {
    try {
        const todos = await TodoModel.find({});
        res.status(200).json(todos);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error Reading Todos");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});
