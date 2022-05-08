import mongoose from "mongoose";

// mongoose schema for plans
const planSchema = new mongoose.Schema({
    Title: String,
    Mon: Array,
    Tue: Array,
    Wed: Array,
    Thu: Array,
    Fri: Array,
    Sat: Array,
    Sun: Array,
    createdBy: String
     
})

module.exports= mongoose.models.Plan || mongoose.model("Plan", planSchema)