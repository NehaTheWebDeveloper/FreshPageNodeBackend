const express = require("express")
const morgan = require("morgan")
const cors =require("cors")
const app = express()
const router = require("./src/api/v2/routes/router")
const dotenv = require("dotenv")
const connectDb = require("./database/dbConfig");
app.use(morgan("tiny"))
app.use(cors());
app.use(express.json())
dotenv.config()


const port = process.env.PORT || 6000
app.use("/api",router) 
app.get("/",async(req,res)=>{
    try {
        res.send("Hellloooo")
        
    } catch (error) {
        res.send(error )
    }
})
// connect()
connectDb().then(()=>{

}).catch((error)=>{
    console.log(error)
})
app.listen(port)