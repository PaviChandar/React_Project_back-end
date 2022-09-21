import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./api/routes/Authenticate.js"
import usersRoute from "./api/routes/User.js"
import hotelsRoute from "./api/routes/Hotel.js"
import roomsRoute from "./api/routes/Room.js"
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express();
dotenv.config();

const connect = async() => {
    try {
        console.log("url : ",process.env.MONGO)
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Mongo DB");
      } catch (error) {
        console.log("Error : ",error)
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
});

//middleware
app.use(cookieParser()) 
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