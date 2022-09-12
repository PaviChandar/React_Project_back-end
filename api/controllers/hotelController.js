import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

//class controller , func name - create
//CREATE
export const createHotel = async(req, res, next) => {
    console.log("new hotel",req.body)
    const newHotel = new Hotel(req.body) //store hotel info

    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch(err) {
        next(err)
    }
}

//UPDATE
export const updateHotel = async(req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},
             { new: true })
        res.status(200).json(updatedHotel)
    } catch(err) {
        res.status(500).json(err)
    }
}

//DELETE
export const deleteHotel = async(req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.")
    } catch(err) {
        res.status(500).json(err)
    }
}

//GET
export const getHotel = async(req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    } catch(err) {
        res.status(500).json(err)
    }
}

//GET ALL
export const getHotels = async(req, res, next) => {
    const { min, max, ...others} = req.query;

    try {
        const hotels = await Hotel.find({
            ...others, 
            cheapestPrice: {$gt:min | 1 , $lt:max || 999},
        }).limit(req.query.limit);
        res.status(200).json(hotels)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

export const countByCity = async(req, res, next) => {
    const cities = req.query.cities.split(",") //split-to get as an array

    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city:city}) //instead of find()
        }));
        res.status(200).json(list)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

export const countByType = async(req, res, next) => {
    const hotelCount = await Hotel.countDocuments({type:"hotel"})
    const villaCount = await Hotel.countDocuments({type:"villa"})
    const apartmentCount = await Hotel.countDocuments({type:"apartment"})
    const resortCount = await Hotel.countDocuments({type:"resort"})
    const cabinCount = await Hotel.countDocuments({type:"cabin"})


    res.status(200).json([
        //add image - resp img
        { type: "hotel", count: hotelCount},
        { type: "villa", count: villaCount},
        { type: "apartment", count: apartmentCount},
        { type: "resort", count: resortCount},
        { type: "cabin", count: cabinCount},
    ])
}

export const getHotelRooms = async(req,res,next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch(err){
        next(err)
    }
}