const Cart = require('../models/Cart');



// function to add product to cart

addProductToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, totalPrice } = req.body;

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

removeProductFromCart = async (req, res) => {

    const itemId = req.params.id;
    const userId = req.user.id;
    count = await Cart.countDocuments({ userId });

    try{

        const cartItem = await Cart.findById(itemId); // Find if the product is in the cart
        
        if (!cartItem) return res.status(404).json({ status: 'false', message: 'Item not found in cart' }); // Return the error message if the product is not found in the cart

        await Cart.findByIdAndDelete(itemId); 
        
        count = await Cart.countDocuments({ userId }); // Count the number of products in the cart

        return res.status(200).json({ status: 'true', message: 'Cart item deleted successfully', count: count }); // Return the success message and the number of products in the cart

    } catch ( error ) {

        return res.status(500).json({ status: 'false', message: 'Error deleting item', error: error.message });

    }

}

// function to get user's cart

fetchUserCart = async (req, res) => {

    const userId = req.user.id;

    try{

        const userCart = await Cart.find({ userId: userId }) // Find all products in the user's cart
        .populate({ // Populate the product information in the cart 
            path: 'productId',
            select: 'title imageUrl restaurant rating ratingCount' // Select the required fields
        });

        return res.status(200).json({ status: 'true', cart: userCart });

    } catch ( error ) {

        return res.status(500).json({ status: 'false', message: 'Error fetching cart', error: error.message });

    }

}

// function to clear user's cart
clearUserCart = async (req, res) => {

    const userId = req.user.id;
    let count;

    try{

        await Cart.deleteMany({ userId: userId }); // Delete all products from the user's cart

        count = await Cart.countDocuments({ userId }); // Count the number of products in the cart

        return res.status(200).json({ status: 'true', message: 'Cart cleared successfully', count: count });

    } catch ( error ) {

        return res.status(500).json({ status: 'false', message: 'Error fetching cart', error: error.message });

    }

}

// function to get cart count (number of products in cart)

getCartCount = async (req, res) => {

    const userId = req.user.id;

    try{

        const count = await Cart.countDocuments({ userId }); // Count the number of products in the cart

        return res.status(200).json({ status: 'true', cartCount: count });

    } catch (error){


        return res.status(500).json({ status: 'false', error: error.message });

    }

}

// function to decrement product quantity in cart

decrementProductQuantity = async (req, res) => {

    const userId = req.user.id;
    const productId = req.body.productId;
    let count;

    try{

        const product = await Cart.findOne({ userId, productId }); // Find if the product is already in the cart

        if (!product) return res.status(404).json({ status: 'false', message: 'product not found in cart' }); // Return the error message if the product is not found in the cart

        const productPrice = product.totalPrice / product.quantity; // Calculate the price of the product

        if (product.quantity == 1){

            await Cart.findByIdAndDelete({ userId, productId });
            count = await Cart.countDocuments({ userId }); // Count the number of products in the cart
            return res.status(200).json({ status: 'true', message: 'Item removed from cart', cartCount: count }); // If the quantity is 1, remove the product from the cart

        }


        // if the product is found in cart and the quantity is greater than 1:

        product.quantity = product.quantity - 1; // Decrement the quantity by 1
        product.totalPrice -= productPrice; // Calculate the new total price
        await item.save(); // Save the updated cart item to the database

        return res.status(200).json({ status: 'true', message: 'Quantity decremented successfully' });

    } catch (error){


    }


}






module.exports = {};