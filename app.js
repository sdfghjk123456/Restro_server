const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const UserModel = require('./userDetails');

const mongoUrl = "mongodb+srv://lakkuntlanaveen03:F54xeaUd0r95R8go@cluster0.sw6usbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// app.get('/signup' , async (req,res) =>{
//   await  UserModel.find([])
//     .then(UserInfo => res.json(UserInfo))
//     .catch(err =>res.json(err))
// })
app.get("/getAllUser", async (req, res) => {
  
    try {
      const allUser = await UserModel.find({});
      res.send({ status: "ok", data: allUser });
    } catch (error) {
      console.log(error);
    }
  });


mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));

require("./userDetails");
const User = mongoose.model("UserInfo")

app.post("/signup", async (req, res) => {
    const { fname, lname, email, password } = req.body;

    try {
        await User.create({
            fname,
            lname,
            email,
            password,
        });
        res.send({ status: "ok" })
    }
    catch (error) {
        console.log(error)
        res.send({ status: "error" })
    }

});

app.post("/login" , async(req,res) =>{
    const {email, password } = req.body;
    const user = await User.findOne({email})
if(!user){
    return res.json({error:"User not found"})
}
res.json({status:"error", error:"INVALID PASSWORD"})
})

app.listen(5000, () => {
    console.log("Server Started");
});