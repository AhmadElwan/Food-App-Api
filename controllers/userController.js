const User = require('../models/User');


// function to get an existing user

getUser = async (req, res) => {

    const userId = req.user.id; // Get the id of the user from the request

    try {
   
        const user = await User.findById({_id: userId}, {__v: 0, updatedAt: 0, createdAt: 0, password: 0}); // Look for the user in the database using the id sent in the request
    
        if (!user) return res.status(404).json({status: 'false', error: 'User not found'}); // Return the error message if the user does not exist
   
        return res.status(200).json({status: 'true', data: user}); // If user found, return the user object
   
    } catch (err) {
       
        return res.status(500).json({status: 'false', message: 'Error retrieving user', error: err.message});
   
    }
}

// function to delete a user

deleteUser = async (req, res) => {

    const userId = req.user.id; // Get the id of the user from the request

    try {

        await User.findByIdAndDelete(userId); // Look for the user in the database using the id and delete it

        return res.status(200).json({status: 'true', message: 'User deleted successfully'});

    } catch (err) {

        return res.status(500).json({status: 'false', message: 'Error deleting user', error: err.message});
    
    }
}

// function to delete a user

updateUser = async (req, res) => {

    const userId = req.user.id; // Get the id of the user from the request

    try {

        const updatedUser = await User.findByIdAndUpdate(userId, { // Look for the user in the database using the id and update it
            $set: req.body
        }, {new: true}); 

        return res.status(200).json({status: 'true', message: 'User updated successfully'});

    } catch (err) {

        return res.status(500).json({status: 'false', message: 'Error updating user', error: err.message});
    
    }
}






modules.exports = {getUser, deleteUser, updateUser};