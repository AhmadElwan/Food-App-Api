const Cart = require('../models/Cart');



// function to add product to cart

addProductToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, totalPrice, quantity } = req.body;

    let count;

    try {

        const existingProduct = await Cart.findOne({ userId, productId }); // Find if the product is already in the cart
        count = await Cart.countDocuments({ userId }); // Count the number of products in the cart

        if (existingProduct) { // If the product is already in the cart, increase the quantity by 1 and add the product price to the existing total price

            existingProduct.quantity += 1;
            existingProduct.totalPrice += totalPrice;
            await existingProduct.save();

        } else {

            const newCart = new Cart({ // If the product is not in the cart, add it to the user's cart
                 userId: userId,
                 productId: req.body.productId,
                 additives: req.body.additives,
                 instructions: req.body.instructions,
                 quantity: req.body.quantity,
                 totalPrice: req.body.totalPrice
                });

            await newCart.save(); // Save the new cart to the database
            count = await Cart.countDocuments({ userId }); // Count the number of products in the cart after adding the new product

        }

        return res.status(200).json({ status: 'true', message: 'Product added to cart successfully', count: count });
        
    } catch (error) {
        
        return res.status(500).json({ status: 'false', message: 'Error adding product to cart', error: error.message });

    }
}

// function to remove product from cart

removeProductFromCart = async (req, res) => {}

// function to fetch user's cart

fetchUserCart = async (req, res) => {}

// function to clear user's cart
clearUserCart = async (req, res) => {}

// function to get cart count (number of products in cart)

getCartCount = async (req, res) => {}

// function to decrement product quantity in cart

decrementProductQuantity = async (req, res) => {}

// function to clear user's cart

clearUserCart = async (req, res) => {}












module.exports = {};