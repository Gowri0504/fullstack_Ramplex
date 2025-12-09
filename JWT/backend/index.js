const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ---- MONGO CONNECTION ----
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Error:", err));


// ---- USER MODEL ----
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);


// ---- FOOD MODEL ----
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    daysAfterIAte: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
const Food = mongoose.model('Food', foodSchema);


// ---- VERIFY TOKEN ----
const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) return res.status(401).send("No token provided");

    // If token sent as: "Bearer <token>"
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid token");

        req.userId = decoded.userId;
        next();
    });
};


// ---- REGISTER USER ----
app.post("/api/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword
        });

        await user.save();
        res.status(201).send("User registered successfully");

    } catch (error) {
        res.status(500).send("Error registering user");
    }
});


// ---- LOGIN USER ----
app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).send("Invalid username or password");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send("Invalid username or password");

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).send("Server error");
    }
});


// ---- ADD FOOD (Protected) ----
app.post("/api/food", verifyToken, async (req, res) => {
    try {
        const { name, daysAfterIAte } = req.body;

        const food = new Food({
            name,
            daysAfterIAte,
            user: req.userId
        });

        await food.save();
        res.status(201).send("Food added successfully");

    } catch (error) {
        res.status(500).send("Error adding food");
    }
});


// ---- GET ALL FOODS ----
app.get("/api/food", verifyToken, async (req, res) => {
    try {
        const foods = await Food.find({ user: req.userId });
        res.json(foods);

    } catch (error) {
        res.status(500).send("Error fetching foods");
    }
});


// ---- UPDATE FOOD ----
app.put("/api/food/:id", verifyToken, async (req, res) => {
    try {
        const { name, daysAfterIAte } = req.body;
        const foodId = req.params.id;

        const updatedFood = await Food.findOneAndUpdate(
            { _id: foodId, user: req.userId },
            { name, daysAfterIAte },
            { new: true }
        );

        if (!updatedFood) return res.status(404).send("Food not found");

        res.json(updatedFood);

    } catch (error) {
        res.status(500).send("Error updating food");
    }
});


// ---- DELETE FOOD ----
app.delete("/api/food/:id", verifyToken, async (req, res) => {
    try {
        const foodId = req.params.id;

        const deletedFood = await Food.findOneAndDelete({
            _id: foodId,
            user: req.userId
        });

        if (!deletedFood) return res.status(404).send("Food not found");

        res.send("Food deleted successfully");

    } catch (error) {
        res.status(500).send("Error deleting food");
    }
});


// ---- START SERVER ----
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
