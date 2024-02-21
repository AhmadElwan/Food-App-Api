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



modules.exports = {verifyToken}