const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
async function connect() {
    try{
    await mongoose.connect("mongodb+srv://mohana_vamsi:vamsi@cluster0.yp652te.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("connected")
    }
    catch(er){
        console.log("error",er)
    }
}

module.exports={connect:connect};