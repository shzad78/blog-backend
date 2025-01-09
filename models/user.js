
const { Schema, model} = require("mongoose");

const userSchema = new Schema({ 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    profileImage: { type: String, default: "./public/images.defualt.jpeg" },
    roles: { type: String, default: "user" ,Enum: ["user", "admin"]},
    
}, {timestamp: true });

const User = model("User", userSchema);
module.exports = User;