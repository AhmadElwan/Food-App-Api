const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { verifyAndAuthorization } = require('../middlewares/verifyToken');


router.post('/', verifyAndAuthorization, cartController.addProductToCart); // add product to cart route

router.patch('/decrement', verifyAndAuthorization, cartController.decrementProductQuantity); // decrement product quantity route

router.delete('/delete/:id', verifyAndAuthorization, cartController.removeProductFromCart); // delete product from cart route

router.get('/', verifyAndAuthorization, cartController.fetchUserCart); // get user cart route

router.get('/count', verifyAndAuthorization, cartController.getCartCount); // get cart count route

router.delete('/clear', verifyAndAuthorization, cartController.clearUserCart); // clear user cart route




module.exports = router;