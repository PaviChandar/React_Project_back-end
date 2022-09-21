import express from "express"
import { verifyAdmin } from "../utils/VerifyToken.js";
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms, updateRoomAvailability, reserveBooking, getBookings } from "../controllers/RoomController.js";

const router = express.Router();

//CREATE
router.post("/:hotelid",verifyAdmin, createRoom); 

//UPDATE
router.put("/:id",verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)

//DELETE
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)

//GET
router.get("/:id", getRoom)
router.post('/reserve/bookings',reserveBooking)
router.get('/reserve/bookings',getBookings)

//GET ALL
router.get("/", getRooms)


export default router