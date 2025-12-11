import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [food, setFood] = useState([]);
  const [newFood, setNewFood] = useState("");
  const [newFoodDays, setNewFoodDays] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      fetchFood(token);
    }
  }, []);

  // Fetch Food
  const fetchFood = async (token) => {
    try {
      const res = await axios.get("http://localhost:3000/api/food", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFood(res.data);
    } catch (err) {
      console.error("Error fetching food data:", err);
    }
  };

  // Register
  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3000/api/register", {
        username,
        password,
      });
      alert("Registration successful! Please login.");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  // Login
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      fetchFood(res.data.token);
    } catch (err) {
      alert("Invalid login!");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setFood([]);
  };

  // Add Food
  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/food",
        {
          name: newFood,
          daysAfterIAte: Number(newFoodDays),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewFood("");
      setNewFoodDays("");
      fetchFood(token);
    } catch (err) {
      console.error("Error adding food:", err);
    }
  };

  // Update Food
  const handleUpdateFood = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/api/food/${id}`,
        {
          name: newFood,
          daysAfterIAte: Number(newFoodDays),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNewFood("");
      setNewFoodDays("");
      fetchFood(token);
    } catch (err) {
      console.error("Error updating food:", err);
    }
  };

  // Delete Food
  const handleDeleteFood = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:3000/api/food/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchFood(token);
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  };

  return (
    <div>
      <h1>
        <center>Food Tracker App - Gowri</center>
      </h1>


      {!isLoggedIn ? (
        <>
          <h2>Register / Login</h2>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>

          <h2>Add Food</h2>
          <form onSubmit={handleAddFood}>
            <input
              type="text"
              placeholder="Food Name"
              value={newFood}
              onChange={(e) => setNewFood(e.target.value)}
            />
            <br />

            <input
              type="number"
              placeholder="Days After Ate"
              value={newFoodDays}
              onChange={(e) => setNewFoodDays(e.target.value)}
            />
            <br />

            <button type="submit">Add Food</button>
          </form>

          <h2>Your Foods</h2>

          <ul>
            {food.map((item) => (
              <li key={item._id}>
                {item.name} — {item.daysAfterIAte} days

                <button onClick={() => handleUpdateFood(item._id)}>
                  Update
                </button>

                <button onClick={() => handleDeleteFood(item._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
