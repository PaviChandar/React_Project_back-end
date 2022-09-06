import mongoose from 'mongoose'

 const RoomSchema = new mongoose.Schema({
   title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
       default: false
    },
    roomNumbers: [{number :Number , unavailableDate: [{type: [Date] }] }], //[Date]-coz type:[String] in Hotel.js
},
{ timestamps: true }
);

export default mongoose.model("Room", RoomSchema)