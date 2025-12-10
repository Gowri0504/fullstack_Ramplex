const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Food Model
const FoodModel = require("./models/Food");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("Food CRUD Backend Running");
});

// Insert Food
app.post("/insert", async (req, res) => {
  try {
    const { foodName, days } = req.body;

    const food = new FoodModel({
      foodName,
      days,
    });

    await food.save();
    res.status(201).json({ message: "Food Inserted" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Insert Error");
  }
});

// Read All Food Items
app.get("/read", async (req, res) => {
  try {
    const foods = await FoodModel.find();
    res.json(foods);
  } catch (err) {
    console.log(err);
    res.status(500).send("Read Error");
  }
});

// Update Food
app.put("/update", async (req, res) => {
  try {
    const { id, newFoodName } = req.body;

    await FoodModel.findByIdAndUpdate(id, {
      foodName: newFoodName,
    });

    res.send("Updated Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Update Error");
  }
});

// Delete Food
app.delete("/delete/:id", async (req, res) => {
  try {
    await FoodModel.findByIdAndDelete(req.params.id);
    res.send("Deleted Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Delete Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
