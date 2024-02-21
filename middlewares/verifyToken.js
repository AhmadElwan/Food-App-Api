const jwt = require('jsonwebtoken');


// Middleware to verify token

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <Token> ---> We need to split to get the token after the space

    if (!token) return res.status(401).send("Access Denied"); // if there is no token return the error

    try{

        const verified = jwt.verify(token, process.env.JWT_SECRET); // verify the token
        req.user = verified; // sace the user to the request
        next(); // Continue to the next middleware

    } catch(err){

        res.status(403).json({status: 'false', error: 'Invalid Token'}); // If the token is invalid, return the error

    }
}

// function to verify token and authorization

const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.userType === 'Admin' || req.user.userType === 'Client' || req.user.userType === 'Driver' || req.user.userType === 'Vendor'){
            next();
        } else {
            res.status(403).json({status: 'false', error: 'You are not authorized to perform this action!'});
        }
    })
}

// function to verify if the user is a Vendor or an Admin

const verifyVendor = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.userType === 'Vendor' || req.user.userType === 'Admin'){
            next();
        } else {
            res.status(403).json({status: 'false', error: 'You are not authorized to perform this action!'});
        }
    })
}

// function to verify if the user is a Driver or an Admin

const verifyDriver = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.userType === 'Driver' || req.user.userType === 'Admin'){
            next();
        } else {
            res.status(403).json({status: 'false', error: 'You are not authorized to perform this action!'});
        }
    })
}

// function to verify if the user is an Admin

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.userType === 'Admin'){
            next();
        } else {
            res.status(403).json({status: 'false', error: 'You are not authorized to perform this action!'});
        }
    })
}






module.exports = {verifyToken, verifyAndAuthorization, verifyVendor, verifyDriver, verifyAdmin}