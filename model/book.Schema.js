import mongoose from "mongoose";
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    availabilityStatus:{
        type:String,
        enum:["AVAILABLE","NOT_AVAILABLE"],
        required:true,
        default:"AVAILABLE"
    },

},{timestamps:true})
const Book=mongoose.model("Book",bookSchema);
export {Book}