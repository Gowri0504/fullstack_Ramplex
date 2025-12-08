const mongoose = require('mongoose');

const uri = "mongodb+srv://root:root@cluster0.7s4hl5u.mongodb.net/?appName=Cluster0";
    
mongoose.connect(uri)
    .then(() => {
        console.log("✅ Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err);
    });

module.exports = mongoose;
