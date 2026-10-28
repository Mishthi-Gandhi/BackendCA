import mongoose from "mongoose";
export function connection(){
   mongoose.connect(process.env.MONGO_URL).catch((err)=>{
    throw err;
   })
}