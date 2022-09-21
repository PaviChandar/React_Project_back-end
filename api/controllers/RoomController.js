import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import createError from "../utils/Error";
import Bookings from "../models/Bookings.js";

//CREATE
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save() 
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        console.log("error : ",err)
        next(err)
    }
}

//UPDATE
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body },
            { new: true })
        res.status(200).json(updatedRoom)
    } catch (err) {
        res.status(500).json(err)
    }
}

//update room based on availability
export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDate": req.body.dates
                }
            }
        )
        res.status(200).json("Room status has been updated")
    } catch (err) {
        next(err)
    }
}

//DELETE
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        } catch (err) {
            next(err)
        }
        res.status(200).json("Room has been deleted.")
    } catch (err) {
        res.status(500).json(err)
    }
}

//GET
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const reserveBooking = async (req, res, next) => {
    const newBooking = new Bookings(req.body) 

    try{
        const savedBooking = await newBooking.save()
        res.status(200).json(savedBooking)
    } catch(err) {
        res.status(500).json(err)
    }
}

export const getBookings = async (req, res, next) => {

    try {
        const bookings = await Bookings.find();
        res.status(200).json(bookings)
    } catch (err) {
         res.status(500).json(err)
    }
} 

//GET ALL
export const getRooms = async (req, res, next) => {

    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
} 
