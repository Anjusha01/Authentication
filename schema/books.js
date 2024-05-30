import mongoose from "mongoose";
 const userSchema = new mongoose.Schema({
    bookName:{
        type:String
    },
    author:{
        type:String
    },
    publisher:{
        type:String
    }
 })

 const Book=mongoose.model('book',userSchema)

 export default Book