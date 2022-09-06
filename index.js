import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./api/routes/auth.js"
import usersRoute from "./api/routes/user.js"
import hotelsRoute from "./api/routes/hotel.js"
import roomsRoute from "./api/routes/room.js"
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express();
dotenv.config();

// console.log("db : ",process.env.MONGO)
// mongoose.connect(process.env.MONGO)
// .then(() => {
//     console.log("Db got connected")
// })
// .then(() => {
//     console.log(`Server is running on port : 8800`)
//     app.listen(8800)})
// .catch(err => console.log("Error in connecting to database, error : " ,err.message))

const connect = async() => {
    try {
        console.log("url : ",process.env.MONGO)
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Mongo DB");
        // 'mongodb://localhost:27017/test'  - secret url
      } catch (error) {
        console.log("Error : ",error)
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
});

// app.use((req,res,next) => {
//     console.log("this is middleware")
//     next()
// })


//middleware
app.use(cookieParser()) //to store token in cookie
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/room", roomsRoute);

//errorhandling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})


app.listen(8800, () => {
    connect()
    console.log("Connected to back-end!");
})