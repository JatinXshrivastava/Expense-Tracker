const path = require("path")
const dotenv = require("dotenv") 
dotenv.config({
    path: path.join(__dirname, "..", ".env")
});

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_DB_URI)

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const TransactionSchema = new mongoose.Schema({
    type: String,
    amount: Number,
    category: String,
    date: String,
    remarks: String,
    userId: mongoose.Types.ObjectId
})

const userModel = mongoose.model("Users", UserSchema)
const transactionModel = mongoose.model("Transactions", TransactionSchema)

module.exports = {
    userModel: userModel,
    transactionModel: transactionModel
}