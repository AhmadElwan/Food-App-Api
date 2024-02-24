const Category = require('../models/Category');


// function to create a new category

const createCategory = async (req, res) => {

    const newCategory = new Category(req.body); // Create a new category object from the request body

    try{

        await newCategory.save(); // Save the new category to the database
        res.status(201).json({status: 'true', message: 'new category added successfully', data: newCategory});

    } catch(err){

        return res.status(500).json({status: 'false', message: 'Error adding category', error: err.message});

    }
}

// function to update a category

const updateCategory = async (req, res) => {

    const categoryId = req.params.id; // Get the id of the category from the request
    const {title, value, imageUrl} = req.body; // Get the title, value, and imageUrl from the request body

    try{
        
        const updatedCategory = await Category.findByIdAndUpdate(categoryId,  // Find the category in the database using the id and update it
            {
                title: title,
                value: value,
                imageUrl: imageUrl
            }, {new: true});


        if(!updatedCategory){
            return res.status(404).json({status: 'false', message: 'Category not found !'}); // Return the error message if no category with the given id exist
        }

        return res.status(200).json({status: 'true', message: 'category updated successfully', data: updatedCategory});

    } catch(err){
        
        return res.status(500).json({status: 'false', message: 'Error updating category', error: err.message});

    }

}

// function to delete a category

const deleteCategory = async (req, res) => {

    const categoryId = req.params.id; // Get the id of the category from the request

    try{

        const category = await Category.findById(categoryId); // Find the category in the database using the id

        if(!category){
        
            return res.status(404).json({status: 'false', message: 'Category not found !'}); // Return the error message if no category with the given id exist
        
        }
        
        await Category.findByIdAndDelete(categoryId); // Find the category in the database using the id and delete it

        return res.status(200).json({status: 'true', message: 'category deleted successfully'});


    } catch(err){
        
        return res.status(500).json({status: 'false', message: 'Error deleting category', error: err.message});

    }
}

// function to get all categories

const getAllCategories = async (req, res) => {

    try{

        const categories = await Category.find({}, {__v: 0, createdAt: 0, updatedAt: 0}); // Find all categories in the database and exclude the _id, __v, createdAt and updatedAt fields

        if(!categories){

            return res.status(404).json({status: 'false', message: 'No categories found !'}); // Return the error message if no categories exist
        
        }

        return res.status(200).json({status: 'true', data: categories});

    } catch(err){
        
        return res.status(500).json({status: 'false', message: 'Error retrieving categories', error: err.message});

    }
}

// function to patch the category image

const patchCategoryImage = async (req, res) => {

    const categoryId = req.params.id; // Get the id of the category from the request
    const imageUrl = req.body.imageUrl; // Get the imageUrl from the request body

    try{
     
        const updatedCategory = await Category.findByIdAndUpdate(categoryId,  // Find the category in the database using the id and update it
            {
                imageUrl: imageUrl
            }
            , {new: true});

        if(!updatedCategory){
            return res.status(404).json({status: 'false', message: 'Category not found !'}); // Return the error message if no category with the given id exist
        }

        return res.status(200).json({status: 'true', message: 'category image updated successfully', data: updatedCategory});

    }
    catch(err){

        return res.status(500).json({status: 'false', message: 'Error updating category image', error: err.message});

    }
}

// function to get random categories

const getRandomCategories = async (req, res) => {

    try{
        
        const categories = await Category.aggregate([ // Find all categories in the database and exclude the _id, __v, createdAt and updatedAt fields
            { $match: { value: { $ne: 'more'}}},
            { $sample: { size: 7 }},
        ]);

        const moreCategory = await Category.findOne({value: 'more'}); // Find the 'more' category in the database

        if(moreCategory){

            categories.push(moreCategory); // Add the 'more' category to the end of the array of categories

        }

        res.status(200).json(categories); // Return the array of categories

    } catch(err){

        res.status(500).json({status: 'false', message: 'Error retrieving categories', error: err.message});
        
    }

}












module.exports = { createCategory, updateCategory, deleteCategory, getAllCategories, patchCategoryImage, getRandomCategories };