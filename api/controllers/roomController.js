import Room from "../models/Room";
import Hotel from "../models/Hotel";
import createError from "../utils/error";

//CREATE
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save() //save or book room
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } }) //update hotel, mongo push method-to use savedRoom in hotel and room
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (err) {
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

// addBookToList = async (req, res) => {
//     try {
//         let existingUserBooking = await Booking.find({ user : req.body.user, book : req.body.book })
//         if (existingUserBooking.length === 1 && existingUserBooking[0].user.toString() === req.body.user)
//             throw 'Already book has been added to your list'
//         let existingBookings = await Booking.find({ book : req.body.book })
//         if (existingBookings.length === 1)
//             throw 'Already this book has been added by other user. Kindly choose another book.'
//         const userBooking = new Booking(req.body)
//         await userBooking.save()
//         res.status(status.SUCCESS).json({message : 'Successfully book has been added to your list'})
//     } catch ( error ) {
//         res.status(status.NOT_FOUND).json({ message : error })
//     }        
// }

//update room based on availability
export const updateRoomAvailability = async (req, res, next) => {
    try {
        //updateOne,sice we update room no and not room
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

//GET ALL
export const getRooms = async (req, res, next) => {

    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (err) {
        // res.status(500).json(err)
        next(err)
    }
} 
