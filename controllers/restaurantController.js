const Restaurant = require('../models/Restaurant');


// function to add a new restaurant

addRestaurant = async (req, res) => {
    
    const newRestaurant = new Restaurant(req.body); // Create a new restaurant object from the request body
    
    try{

        await newRestaurant.save(); // Save the new restaurant to the database
        res.status(201).json({status: 'true', message: 'Restaurant added successfully'});

    } catch(err){
        
        return res.status(500).json({status: 'false', message: 'Error adding restaurant', error: err.message});
    
    }
}

// functiion to trigger the service availability --> (isAvailable)

serviceAvailablity = async (req, res) => {
    
    const restaurantId = req.params.id; // Get the id of the restaurant from the request

    try{

        const restaurant = await Restaurant.findById(restaurantId); // Find the restaurant in the database

        if(!restaurant){

            return res.status(404).json({status: 'false', message: 'Restaurant not found'}); // Return the error message if no restaurant with the given id exist
        
        }

        restaurant.isAvailable = !restaurant.isAvailable; // Toggle the availability

        await restaurant.save(); // Save the updated restaurant to the database

        return res.status(200).json({status: 'true', message: 'Service availability updated successfully', isAvailable: restaurant.isAvailable}); 

    } catch(err){

        return res.status(500).json({status: 'false', message: 'Error updating restaurant\'s availability', error: err.message});

    }
}

// delete an already existing restaurant

deleteRestaurant = async (req, res) => {

    const restaurantId = req.params.id; // Get the id of the restaurant from the request

    try{

        await Restaurant.findByIdAndDelete(restaurantId); // Find the restaurant in the database using the id and delete it

        return res.status(200).json({status: 'true', message: 'Restaurant deleted successfully'});

    } catch(err){

        return res.status(500).json({status: 'false', message: 'Error deleting restaurant', error: err.message});
        
    }

}

// function to get a restaurant

getRestaurant = async (req, res) => {

    const restaurantId = req.params.id; // Get the id of the restaurant from the request

    try{
        
        const restaurant = await Restaurant.findById(restaurantId, {__v: 0, updatedAt: 0, createdAt: 0}); // Find the restaurant in the database using the id

        if(!restaurant){

            return res.status(404).json({status: 'false', message: 'Restaurant not found'}); // Return the error message if no restaurant with the given id exist
        
        }

        return res.status(200).json({status: 'true', data: restaurant});

    } catch(err){
        
        return res.status(500).json({status: 'false', message: 'Error retrieving restaurant', error: err.message});

    }
}

// function to suggest some random restaurants

getRandomRestaurants = async (req, res) => {

    try{

        let randomRestaurants = []; // Array to store the suggested random restaurants

        if(req.params.code){ // If a code is provided in the request, suggest random restaurants from the same code
            randomRestaurants = await Restaurant.aggregate([
                { $match: { code: req.params.code } },
                { $sample: { size: 6 } }, // Get 6 random restaurants from the same code
                { $project: { _id: 0, __v: 0, updatedAt: 0, createdAt: 0 } } // Exclude the _id, __v, updatedAt and createdAt fields
            ]);
        }

        if(!randomRestaurants.length){ // If no code is provided, suggest random restaurants from all codes
        
            randomRestaurants = await Restaurant.aggregate([
                { $sample: { size: 6 } },
                { $project: { _id: 0, __v: 0, updatedAt: 0, createdAt: 0 } }
            ])
        }

        if(randomRestaurants.length){ // If random restaurants found, return them
         
            return res.status(200).json({status: 'true', data: randomRestaurants});
        
        }

    } catch(err){
        
        return res.status(500).json({status: 'false', message: 'Error suggesting restaurants', error: err.message});

    }
}













module.exports = { addRestaurant, serviceAvailablity, deleteRestaurant, getRestaurant, getRandomRestaurants };