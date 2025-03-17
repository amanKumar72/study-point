require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT||8080;
const cookieParse = require("cookie-parser");
// const cors = require("cors");

const connectDB = require("./config/database");
connectDB()

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})