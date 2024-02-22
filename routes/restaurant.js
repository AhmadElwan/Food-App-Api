const router = require('express').Router();
const restaurantController = require('../controllers/restaurantController');
const { verifyVendor } = require('../middlewares/verifyToken');

router.post('/', verifyVendor, restaurantController.addRestaurant); // add restaurant route -- ONLY VENDORS AND ADMIN

router.get('/byId/:id', restaurantController.getRestaurant); // get restaurant route

router.get('/:code', restaurantController.getRandomRestaurants); // suggest random restaurant route

router.delete('/', verifyVendor, restaurantController.deleteRestaurant); // delete restaurant route -- ONLY VENDORS AND ADMIN

router.patch('/:id', verifyVendor, restaurantController.serviceAvailablity); // update restaurant route -- ONLY VENDORS AND ADMIN



module.exports = router;