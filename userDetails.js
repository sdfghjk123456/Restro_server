const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: String,
    password: String,
    
  },
  {
    collection: "UserInfo",
  }
);

const UserModel= 
mongoose.model("UserInfo", UserDetailsScehma);
module.exports = UserModel;