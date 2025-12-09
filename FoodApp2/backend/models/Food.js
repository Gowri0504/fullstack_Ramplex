const mongoose=require('mongoose');
const FoodSchema=new mongoose.Schema({
    foodname:{
        type:String,
        required:true           
    },
    daySinceIAte:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model("Food",FoodSchema);