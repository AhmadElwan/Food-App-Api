const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');


// Register a new user

const register = async (req, res) => {
    
    const user = req.body;

    try{

        await admin.auth().getUserByEmail(user.email); // Get the email entered by the user

        res.status(400).json({message: 'The email address you entered is already associated with an existing account!'}); // Checking if the email is already used

    } catch(err) {
        if(err.code === 'auth/user-not-found') { // If no user with this email is found

            try{

                const createdUser = await admin.auth().createUser({ // Create a new user and save it to the database (Firebase)
                    email: user.email,
                    password: CryptoJS.AES.encrypt(user.password, process.env.KEY).toString(),
                    emailVerified: false,
                    disabled: false
                });

                console.log(createdUser.uid);

                const newUser = new User({ // Create a new user and save it to the database (MongoDB)
                    username: user.username,
                    email: user.email,
                    password: CryptoJS.AES.encrypt(user.password, process.env.KEY).toString(),
                    uid: createdUser.uid, // Save the UID of the new user from the firebase to the MongoDB
                    userType: 'Client'
                });

                await newUser.save(); // Save the new user to the MongoDB

                res.status(201).json({status: 'true', message: 'User created successfully!'});

            } catch(err) {

                res.status(500).json({status: 'false', error: err.message}); // Return the error message if the user could not be created

            }

    }

}
}

// Login as an existing user 

const login = async (req, res) => {
    
    try{

        const user = await User.findOne({email: req.body.email}, {__v: 0, updatedAt: 0, createdAt: 0}); // Look for the user in the database and return it if it exists

        !user && res.status(401).json({message: 'Invalid credentials!'}); // Return the error message if the user does not exist

        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.KEY).toString(CryptoJS.enc.Utf8); // Decrypt the password stored in the database 

        decryptedPassword !== req.body.password && res.status(401).json({message: 'Invalid credentials!'}); // Return the error message if the password is incorrect

        const userToken = jwt.sign({ // Create a token for the user and save the id, userType and the email of the user in the token
            id: user._id, 
            userType: user.userType,
            email: user.email
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: '7d' // Set the token to expire in 7 days 
        }
        );

        const {password, email, ...others} = user._doc; // Remove the password and email from the user object

        res.status(200).json({status: 'true', token: userToken, user: others}); // Return the token and the user object

    } catch(err) {

        res.status(500).json({status: 'false', error: err.message}); // Return the error message if the user could not be found

    }

}


module.exports = { register, login };