const express=require('express');
const app=express();
const port=3000;


// app.get('/',(req,res)=>{
//     res.send('Hello, World!');
// });

app.put('/update',(req,res)=>{
    res.send('update');});

app.delete('/delete',(req,res)=>{
    res.send('delete');
});
// app.get('/users/:usersid',(req,res)=>{
//     const userid=req.params.usersid;
//     res.send(`user id is ${userid}`);
// });

app.get('/data/:dataid/profile',(req,res)=>{
    const dataid=req.params.dataid;
    const name=req.query.name;
    const age=req.query.age;
    console.log(`name is ${name} and age is ${age}`);
    res.send(`data id is ${dataid}`);
});


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});