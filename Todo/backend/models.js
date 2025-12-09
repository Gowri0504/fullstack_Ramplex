const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// USER MODEL
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model("User", UserSchema);

// FOOD / TODO MODEL
const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    daysAfterIAte: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
const Food = mongoose.model("Food", FoodSchema);

// AUTH MIDDLEWARE
const auth = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).send("No token provided");

    const token = header.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid token");
        req.userId = decoded.userId;
        next();
    });
};

module.exports = { User, Food, auth };
