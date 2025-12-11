const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/food_app")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

const FoodSchema = new mongoose.Schema({
  name: String,
  daysAfterIAte: Number,
  userId: String
});

const Food = mongoose.model("Food", FoodSchema);

// ----------------- AUTH MIDDLEWARE -----------------
function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, "secret123", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid Token" });

    req.userId = decoded.id;
    next();
  });
}

// ----------------- REGISTER -----------------
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ username, password: hashedPassword });

  res.json({ message: "User registered" });
});

// ----------------- LOGIN -----------------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ message: "User not found" });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect)
    return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "secret123");

  res.json({ token });
});

// ----------------- FOOD CRUD -----------------

// Read
app.get("/api/food", verifyToken, async (req, res) => {
  const foods = await Food.find({ userId: req.userId });
  res.json(foods);
});

// Create
app.post("/api/food", verifyToken, async (req, res) => {
  const { name, daysAfterIAte } = req.body;

  await Food.create({
    name,
    daysAfterIAte,
    userId: req.userId
  });

  res.json({ message: "Food added" });
});

// Update
app.put("/api/food/:id", verifyToken, async (req, res) => {
  const { name, daysAfterIAte } = req.body;

  await Food.findByIdAndUpdate(req.params.id, {
    name,
    daysAfterIAte
  });

  res.json({ message: "Food updated" });
});

app.delete("/api/food/:id", verifyToken, async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.json({ message: "Food deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
