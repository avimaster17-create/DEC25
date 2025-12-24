require("dotenv").config();
const express = require("express");
const app = express();
const science = require("./science.json");
const userRouter = require("./routes/userRoutes");
const notesRouter = require("./routes/notesRoutes");
const mongoose = require("mongoose");

app.use(express.json());
app.use("/users",userRouter);
app.use("/notes",notesRouter);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://avinashpandey1711_db_user:WucBbkbGk8yAW84R@cluster0.zb83t2q.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(5000,() => {
        console.log("server is running on 5000");
    })
})
.catch((error)=>{
    console.log("MongoDB connection error:", error);
})
app.get('/',(req,res)=>{
    res.send("Hello User");
})

app.get('/science',(req,res)=>{
    res.status(200).json(science);
})

app.get('/random',(req,res)=>{
    let scientists = science.scientists;
    let index = Math.floor(Math.random()*scientists.length);
    let z = scientists[index];
    res.status(200).json(z);
})

