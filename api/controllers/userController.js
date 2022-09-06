import User from "../models/User.js"
//create service
//CREATE - we have register for create

//UPDATE
export const updateUser = async(req, res, next) => {
    try {
        const updatedUser = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},
             { new: true })
        res.status(200).json(updatedUser)
    } catch(err) {
        res.status(500).json(err)
    }
}

//DELETE
export const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.")
    } catch(err) {
        res.status(500).json(err)
    }
}

//GET
export const getUser = async(req, res, next) => {
    try {
        const user= await User.findById(req.params.id);
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
}

//GET ALL
export const getUsers = async(req, res, next) => {

    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}