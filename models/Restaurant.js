const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    food: {
        type: Array,
        required: true
    },

    pickup: {
        type: Boolean,
        required: false,
        default: true
    },

    delivery: {
        type: Boolean,
        required: false,
        default: true
    },

    owner: {
        type: String,
        required: true
    },

    isAvailable: {
        type: Boolean,
        default: true
    },

    code: {
        type: String,
        required: true
    },

    logoUrl:{
        type: String,
        required: false,
        default: 'http://d326fntlu7tb1e.cloudfront.net/uploads/bdec9d7d-0544-4fc4-823d-3b898f6dbbbf-vinci_03.jpeg'
    },

    rating: {
        type: Number,
        min: 1,
        max: 5
    },

    ratingCount: {
        type: String
    },

    coordinates: {

        id: {
            type: String,
            required: true
        },

        latitudeDelta: {
            type: Number,
            required: true
        },

        longitudeDelta: {
            type: Number,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        }
        
    }


    
}, {timestamps: true});

module.exports = mongoose.model('Restaurant', RestaurantSchema);