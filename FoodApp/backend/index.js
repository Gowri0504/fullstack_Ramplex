const express = require('express');
const app = express();  
require('dotenv').config();
const mongoose = require('./db');

app.use(express.json());
// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/data/:dataID', (req, res) => {
    res.send(`You requested data with ID: ${req.params.dataID}`);
});
//post,patc,delete,put
app.post('/data', (req, res) => {
  res.send('POST request to the homepage');
});

app.put('/data/:id', (req, res) => {
  res.send(`PUT request to update data with id ${req.params.id}`);
});

app.patch('/data/:id', (req, res) => {
  res.send(`PATCH request to partially update data with id ${req.params.id}`);
});
// Start the server
app.listen(process.env.PORT,() => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

app.get('/data/:dataID/profile', (req, res) => {
    const dataID = req.params.dataID;
    const age = 25; // Example age value
    res.send(`Profile page for data ID: ${dataID}`);
});

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
  Email:{type:String,required:true,unique:true}

})

const User=mongoose.model('User',userSchema);
const newUser=new User({
    name:"Gowri D",
    age:30,
    Email:"gowri@gmail.com"
});
newUser.save()
.then((user)=>{
    console.log("User saved successfully:",user);
})
.catch((err)=>{
    console.error("Error saving user:",err);
}); 