import mongoose from "mongoose";

//  mongoose schema for users

const userSchema = new mongoose.Schema({
    userID: String,
    password: String, 
    following: Object,
  
})

module.exports= mongoose.models.User || mongoose.model("User", userSchema)