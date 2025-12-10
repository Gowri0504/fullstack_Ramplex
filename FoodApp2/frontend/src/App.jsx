import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState("");
  const [newFoodName, setNewFoodName] = useState("");
  const [foodList, setFoodList] = useState([]);

  // Load all foods
  useEffect(() => {
    axios.get("http://localhost:3000/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  // Add food
  const addToList = () => {
    axios
      .post("http://localhost:3000/insert", {
        foodName,
        days: Number(days),
      })
      .then(() => {
        window.location.reload();
      });
  };

  // Update food
  const updateFood = (id) => {
    axios
      .put("http://localhost:3000/update", {
        id,
        newFoodName,
      })
      .then(() => {
        window.location.reload();
      });
  };

  // Delete food
  const deleteFood = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="App">
      <h1>MERN Food CRUD App</h1>

      <label>Food Name:</label>
      <input type="text" onChange={(e) => setFoodName(e.target.value)} />

      <label>Days Since You Ate It:</label>
      <input type="number" onChange={(e) => setDays(e.target.value)} />

      <button onClick={addToList}>Add</button>

      <hr />
      <h1>Food List</h1>

      {foodList.map((val) => {
        return (
          <div key={val._id} className="foodCard">
            <h3>Food Name: {val.foodName}</h3>
            <h3>Days: {val.days}</h3>

            <input
              type="text"
              placeholder="New Food Name..."
              onChange={(e) => setNewFoodName(e.target.value)}
            />

            <button onClick={() => updateFood(val._id)}>Update</button>
            <button onClick={() => deleteFood(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
