const e = require('express');
const Food = require('../models/Food');


// function to add a new food

const addFood = async (req, res) => {

    const newFood = new Food(req.body); // Create a new food object from the request body

    try {
        
        await newFood.save(); // Save the new food to the database
        res.status(200).json({status: 'true', message: 'New food added successfully', data: newFood});

    } catch (err) {

        return res.status(500).json({status: 'false', message: 'Error adding food', error: err.message});
        
    }

}

// function to get food by id

const getFoodById = async (req, res) => {
    
    const foodId = req.params.id; // Get the id of the food from the request params

    try {
        
        const food = await Food.findById(foodId); // Find the food in the database using the id

        if(!food){

            return res.status(404).json({status: 'false', message: 'No food found with this id !'});
        
        }

        return res.status(200).json({status: 'true', data: food});

    } catch (err) {
        
        return res.status(500).json({status: 'false', message: 'Error retrieving food', error: err.message});
        
    }

}

// function to get food by restaurant

const getFoodByRestaurant = async (req, res) => {

    const restaurantId = req.params.restaurantId; // Get the id of the restaurant from the request params

    try {
     
        const food = await Food.find({restaurant: restaurantId}); // Find the food in the database using the restaurant id

        if(!food || food.length === 0){

            return res.status(404).json({status: 'false', message: 'No food found with this restaurant\'s id !'});

        }

        return res.status(200).json({status: 'true', data: food});

    } catch (err) {

        return res.status(500).json({status: 'false', message: 'Error retrieving food', error: err.message});

    }
}

// function to delete food by id

const deleteFood = async (req, res) => {

    const foodId = req.params.id; // Get the id of the food from the request params

    try {

        const food = await Food.findById(foodId); // Find the food in the database using the id

        if(!food){
            
            return res.status(404).json({status: 'false', message: 'No food found with this id !'});

        }
        
        await Food.findByIdAndDelete(foodId); // Find the food in the database using the id and delete it

        return res.status(200).json({status: 'true', message: 'Food deleted successfully'});

    } catch (err) {
        
        return res.status(500).json({status: 'false', message: 'Error deleting food', error: err.message});

    }
}

// function to patch the food availability (toggle)

const foodAvailability = async (req, res) => {

    const foodId = req.params.id; // Get the id of the food from the request params

    try {
        
        const food = await Food.findById(foodId); // Find the food in the database using the id

        if(!food){
            
            return res.status(404).json({status: 'false', message: 'No food found with this id !'});

        }

        food.isAvailable = !food.isAvailable; // Toggle the availability of the food

        await food.save(); // Save the updated food to the database

        return res.status(200).json({status: 'true', message: 'Food availability updated successfully', isAvailable: food.isAvailable});

    } catch (err) {
        
        return res.status(500).json({status: 'false', message: 'Error updating food', error: err.message});

    }

}

// function to update food by id

const updateFood = async (req, res) => {

    const foodId = req.params.id; // Get the id of the food from the request params

    try {

        const food = await Food.findById(foodId); // Find the food in the database using the id

        if(!food){
            
            return res.status(404).json({status: 'false', message: 'No food found with this id !'});

        }

        // The runValidators option ensures that the updated food is validated before being saved to the database

        const updatedFood = await Food.findByIdAndUpdate(foodId, req.body, {new: true, runValidators: true}); // Find the food in the database using the id and update it

        return res.status(200).json({status: 'true', message: 'Food updated successfully', data: updatedFood});
        
    } catch (err) {
        
        return res.status(500).json({status: 'false', message: 'Error updating food', error: err.message});

    }
}

// function to add food tag

const addFoodTag = async (req, res) => {
    
    const foodId = req.params.id; // Get the id of the food from the request params
    const {tag} = req.body; // Get the tag from the request body

    try {
        
        const food = await Food.findById(foodId); // Find the food in the database using the id

        if(!food){
            
            return res.status(404).json({status: 'false', message: 'No food found with this id !'});

        }

        if(food.foodTags.includes(tag)){ // Check if the tag already exists in the foodTags array
            
            return res.status(400).json({status: 'false', message: 'Tag already exists !'});

        }

        food.foodTags.push(tag); // Add the tag to the foodTags array

        await food.save(); // Save the updated food to the database

        return res.status(200).json({status: 'true', message: 'Food tag added successfully', data: food});

    } catch (err) {
        
        return res.status(500).json({status: 'false', message: 'Error adding food tag', error: err.message});

    }

}

// function to get random food by code

const getRandomFoodByCode = async (req, res) => {

    const code = req.params.code; // Get the code from the request params

    try {
        
        const randomFood = await Food.aggregate([ // Get random food from the same code
            { $match: { code: code } },
            { $sample: { size: 5 } }, // Get 5 random food from the same code
            { $project: { _id: 0, __v: 0 } } // Exclude the _id and __v
        ]);

        if (!randomFood.length) {
            
            return res.status(404).json({status: 'false', message: 'No food found with this code !'});

        }

        return res.status(200).json({status: 'true', data: randomFood});

    } catch (err) {
        
        return res.status(500).json({status: 'false', message: 'Error getting random food', error: err.message});

    }
}

// function to add food type

const addFoodType = async (req, res) => {
    
    const foodId = req.params.id; // Get the id of the food from the request params
    const foodType = req.body.type; // Get the type from the request body

    try {
        
        const food = await Food.findById(foodId); // Find the food in the database using the id

        if(!food){
            
            return res.status(404).json({status: 'false', message: 'No food found with this id !'});

        }

        if(food.foodTypes.includes(foodType)){ // Check if the type already exists in the foodTypes array

            return res.status(400).json({status: 'false', message: 'Type already exists !'});

        }

        food.foodTypes.push(foodType); // Add the type to the foodTypes array

        await food.save(); // Save the updated food to the database

        return res.status(200).json({status: 'true', message: 'Food type added successfully', data: food});

    } catch (err) {
        
        return res.status(500).json({status: 'false', message: 'Error adding food type', error: err.message});

    }

}

// function to get random food by category and code

const getRandomByCategoryAndCode = async (req, res) => {

    const {category, code} = req.params; // Get the category and code from the request params

    try {
        
        let food = await Food.aggregate([ // Get random food from the same category and code
            { $match: { category: category, code: code } },
            { $sample: { size: 10 } }, // Get 10 random food from the same category and code
            { $project: { _id: 0, __v: 0 } } // Exclude the _id and __v
        ]);

        if (!food || food.length === 0) { // If no food found, get random food from ALL CATEGORIES but the SAME CODE

            randomCategoryFood = await Food.aggregate([ // Get random food from all categories and the same code
                { $match: { code: code } },
                { $sample: { size: 10 } },
                { $project: { _id: 0, __v: 0 } } 
            ]);

            if (!randomCategoryFood || randomCategoryFood.length === 0) { // If no food found, get random food from ALL CATEGORIES and ALL CODES
                
                randomFood = Food.aggregate([ // Get random food from the same category and code
                { $sample: { size: 10 } }, // Get 10 random food from the same category and code
                { $project: { _id: 0, __v: 0 } } // Exclude the _id and __v
            ]);

            return res.status(200).json({status: 'true', data: randomFood});

            } 

            return res.status(200).json({status: 'true', data: randomCategoryFood});

        }

        return res.status(200).json({status: 'true', data: food});

    } catch (err) {

        return res.status(500).json({status: 'false', message: 'Error getting random food', error: err.message});
        
    }

}








module.exports = { addFood, getFoodById, getFoodByRestaurant, deleteFood, foodAvailability, updateFood, addFoodTag, getRandomFoodByCode, addFoodType, getRandomByCategoryAndCode };