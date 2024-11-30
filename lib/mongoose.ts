import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async ()=>{
    mongoose.set('strictQuery',true)
    if(!process.env.MONGODB_URI) return  console.log("MONGO DB IS NOT SET UP CHECK ENV ")
    if(isConnected) return console.log("using exiting database connection ")
    try {
        mongoose.connect(process.env.MONGODB_URI )
        isConnected = true
        console.log("connected to mongo database") 
    } catch (error:any) {
        console.log("error in connection to mongo db",error?.message)
    }

}