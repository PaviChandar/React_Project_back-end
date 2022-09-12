import User from "../models/User.js"
import bcrypt from "bcryptjs"
import createError from "../utils/error.js"
import jwt from "jsonwebtoken"

//register
export const register = async (req, res, next) => {
    try {
        console.log("req body",req.body)
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        console.log("hash",hash)
        const newUser = new User({
            // username:req.body.username,
            // email:req.body.email,
            ...req.body,  //get all details
            password:hash,
        })
        console.log("user",newUser)

    await newUser.save()
    console.log("saved")
    res.status(200).send("User has been created")
    } catch(err) {
        next(err)
    }
}

//login
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) 
            return next(createError(404,"User not found!"))
         
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password) 
        if (!isPasswordCorrect)
            return next(createError(400,"Wrong Password or username!"))
        const token = jwt.sign({id: user._id, isAdmin:user.isAdmin, name: user.username }, process.env.JWT)

        const { password, isAdmin, ...otherDetails } = user._doc;
        res
        .cookie("access_token", token, {  //sending cookie
            httpOnly: true //config- doesnt allow client secret to reach cookie
        })
        .status(200).json({ details :{...otherDetails}, isAdmin, token})
    } catch(err) {
        next(err)
    }
}