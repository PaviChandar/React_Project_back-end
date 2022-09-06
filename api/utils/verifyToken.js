import jwt from "jsonwebtoken";
import   createError  from "../utils/error.js"

//verifyToken - middleware
export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    //if not a token
    if(!token) {
        return next(createError(401, "You are not authenticated"))
    }

    //if no error and if a token, verify if it is a correct one
    jwt.verify(token,process.env.JWT, (err, user) => {
        if(err)
        return next(createError(403, "Token is not valid!"))

        //valid token
        req.user = user; //(req.hello = user) can use any property as hello
        next()
    })
};

export const verifyUser = (req,res,next) => {
    verifyToken(req,res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){ //only owner of acc and admin can delete the acc
        next();
        } else {
        return next(createError(403,"You are not authorized"))
 } });
}

export const verifyAdmin = (req,res,next) => {
    verifyToken(req,res,next, () => {
        if(req.user.isAdmin){ //only owner of acc and admin can delete the acc
        next();
        } else {
        return next(createError(403,"You are not authorized"))
 } });
}