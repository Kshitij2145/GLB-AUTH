// const mongoose = require("mongoose");

// const schema=new mongoose.Schema({
//     username:{type:String,required:true},
//     fullname:{type:String,required:true},
//     email:{type:String,required:true},
//     password:{type:String,required:true},
//     mobile:{type:String,required:true},
//     skills:{type:String,required:true},
//     branch:{type:String,required:true},
//     year:{type:String,required:true},
//     linkedin:{type:String,required:true},
// });

// module.exports=mongoose.model("user",schema)

import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true, trim: true },
//     fullname: { type: String, required: true, trim: true },
//     email: { 
//         type: String, 
//         required: true, 
//         unique: true, 
//         lowercase: true, 
//         trim: true, 
//         match: [/^\S+@\S+\.\S+$/, "Invalid email format"] 
//     },
//     password: { type: String, required: true },
//     mobile: { 
//         type: String, 
//         required: true, 
//         unique: true, 
//         match: [/^\d{10}$/, "Mobile number must be 10 digits"] 
//     },
//     skills: { type: [String], required: true },  // Now an array
//     branch: { type: String, required: true, trim: true },
//     year: { 
//         type: String, 
//         required: true, 
//         match: [/^\d{4}$/, "Year must be a 4-digit number"] 
//     },
//     linkedin: { 
//         type: String, 
//         required: true, 
//         match: [/^https?:\/\/(www\.)?linkedin\.com\/.*$/, "Invalid LinkedIn URL"] 
//     }
// }, { timestamps: true }); // Adds createdAt and updatedAt fields
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    skills: { type: [String], default: [] },
    branch: { type: String, required: true },
    year: { type: Number, required: true },
    linkedin: { type: String }
});

const User = mongoose.model("User", UserSchema);
export default User; 

