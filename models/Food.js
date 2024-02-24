const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },

    foodTags: {
        type: Array,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    code:{
        type: String,
        required: true
    },

    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },

    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },

    rating:{
        type: Number,
        min: 1,
        max: 5
    },

    ratingCount:{
        type: Number
    },

    description:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    additives:{
        type: Array,
        required: true
    },

    imageUrl: {
        type: Array,
        required: true
    }


    
}, {timestamps: false});

module.exports = mongoose.model('Food', FoodSchema);