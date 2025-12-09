const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User, Food, auth } = require("./models");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// CONNECT TO MONGO
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


// REGISTER
app.post("/api/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.send("User registered");
    } catch (err) {
        res.status(500).send("Error registering");
    }
});


// LOGIN
app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).send("Invalid username or password");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).send("Invalid username or password");

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).send("Login error");
    }
});


// ADD FOOD (protected)
app.post("/api/food", auth, async (req, res) => {
    try {
        const { name, daysAfterIAte } = req.body;

        const food = new Food({
            name,
            daysAfterIAte,
            user: req.userId
        });

        await food.save();
        res.send("Food added");
    } catch (err) {
        res.status(500).send("Error adding food");
    }
});


// GET USER FOODS
app.get("/api/food", auth, async (req, res) => {
    try {
        const foods = await Food.find({ user: req.userId });
        res.json(foods);
    } catch (err) {
        res.status(500).send("Error fetching food");
    }
});


// DELETE FOOD
app.delete("/api/food/:id", auth, async (req, res) => {
    try {
        await Food.findOneAndDelete({ _id: req.params.id, user: req.userId });
        res.send("Food deleted");
    } catch (err) {
        res.status(500).send("Error deleting");
    }
});


// SERVER
app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
});
