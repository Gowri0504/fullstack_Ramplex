const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
require('./db');

const port = process.env.PORT;

// PUT route
app.put('/updateuser', (req, res) => {
  res.send('update');
});

// DELETE route
app.delete('/deleteuser', (req, res) => {
  res.send('delete');
});

// Route with params + query
app.get('/data/:dataid/profile', (req, res) => {
  const dataid = req.params.dataid;
  const name = req.query.name;
  const age = req.query.age;

  console.log(`name is ${name} and age is ${age}`);

  res.send(`data id is ${dataid}, name is ${name}, age is ${age}`);
});

const userSchema=new mongoose.Schema({
  name:{type:String,required:true},
  age:{type:Number,required:true},
  email:{type:String,required:true,unique:true}
})

const User = mongoose.model('User', userSchema);
const newuser=new User({
  name:"Ramplex",
  age:21,
  email:"ram@example.com"
})
newuser.save().
then((user)=>{
  console.log("user inserted");
}).catch((err)=>{
  console.log("error occured",err);
});
// Server listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
