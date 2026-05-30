const path = require("path")
const dotenv = require("dotenv") 
dotenv.config({
    path: path.join(__dirname, "..", ".env")
});
const express = require("express")
const app = express() 
const jwt = require("jsonwebtoken")
const dns = require('dns')
const { authMiddleware } = require("./middleware")
const { userModel , transactionModel } = require("./model")

app.use(express.json()) 
dns.setServers(['8.8.8.8', '8.8.4.4'])
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use("/media", express.static(path.join(__dirname, "..", "media")));

app.post("/signup" , async (req,res) => {
    const username = req.body.username 
    const email = req.body.email 
    const password = req.body.password 
    const userExists = await userModel.findOne({
        $or: [{username}, {email}]
    })
    if(userExists) {
        res.status(403).json({
            message : "User with this username or email already exists" 
        })
        return 
    }
    const newUser = await userModel.create({
        username,
        email,
        password,
    })
    res.json({
        id:newUser._id
    })
})

app.post("/login" , async (req,res) => {
    const username = req.body.username 
    const password = req.body.password 
    const user = await userModel.findOne({
        username
    }) 
    if(!user || user.password !== password) {
        res.status(403).json({
            message : "Invalid username or password"
        })
        return 
    }
    const token = jwt.sign({username, userId: user._id} , process.env.JWT_SECRET) 
    res.json({
        token : token ,
        message : "Logged In Successfully ! "
    })
})

app.get("/transaction" , authMiddleware , async (req,res) => {
    const userId = req.userId 
    const userTransactions = await transactionModel.find({userId}) 
    res.json({
        transactions : userTransactions 
    })
})

app.post("/transaction/income", authMiddleware , async (req,res) => {
    const userId = req.userId 
    const amount = req.body.amount 
    const category = req.body.category 
    const date = req.body.date 
    const remarks = req.body.remarks 
    await transactionModel.create({
        type : "income" ,
        userId,
        amount ,
        category,
        date,
        remarks,
    })
    res.json({
        message : "transaction added successfully"
    })
})

app.post("/transaction/expense",authMiddleware , async (req,res) => {
    const userId = req.userId 
    const amount = req.body.amount 
    const category = req.body.category 
    const date = req.body.date 
    const remarks = req.body.remarks 
    await transactionModel.create({
        type : "expense" ,
        userId,
        amount ,
        category,
        date,
        remarks,
    })
    res.json({
        message : "transaction added successfully"
    })
})

app.get("/" , (req,res) => {
    res.sendFile(path.join(__dirname,".." , "frontend", "index.html"))
})

app.get("/signup" , (req,res) => {
    res.sendFile(path.join(__dirname,".." , "frontend", "signup.html"))
})

app.get("/login" , (req,res) => {
    res.sendFile(path.join(__dirname,".." , "frontend", "login.html"))
})

app.listen(3000 , () => {
    console.log("Server running on port 3000") 
})