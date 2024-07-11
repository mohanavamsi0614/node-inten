const mongoose=require("mongoose")
const schema=mongoose.Schema({
    name:String,
    password:String,
    email:String,
    token:String,
    photo:String,
    valid:Boolean
})
const schema2=mongoose.Schema({
    name:String,
    photo:String,
    des:String,
    created_by:String
})
const model=mongoose.model("user",schema)
const model2=mongoose.model("repo",schema2)
module.exports={user:model,repo:model2}