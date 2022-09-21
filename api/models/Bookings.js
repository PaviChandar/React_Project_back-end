import mongoose from 'mongoose'

 const BookingSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    hotelName:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    price: {
        type: Number,
    }
}
);

export default mongoose.model("Booking", BookingSchema)