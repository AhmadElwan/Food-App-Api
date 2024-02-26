const router = require('express').Router();
const foodController = require('../controllers/foodController');
const { verifyVendor } = require('../middlewares/verifyToken');

router.post('/', verifyVendor, foodController.addFood); // add food route -- ONLY VENDORS AND ADMIN

router.post('/tags/:id', verifyVendor, foodController.addFoodTag); // add foodTags route -- ONLY VENDORS AND ADMIN

router.post('/type/:id', verifyVendor, foodController.addFoodType); // add foodType route -- ONLY VENDORS AND ADMIN

router.get('/:id', foodController.getFoodById); // get food route

router.get('/:category/:code', foodController.getRandomByCategoryAndCode); // get random food route by CATEGORY and CODE

router.delete('/:id', verifyVendor, foodController.deleteFood); // delete food route -- ONLY VENDORS AND ADMIN

router.patch('/:id', verifyVendor, foodController.foodAvailability); // update food route -- ONLY VENDORS AND ADMIN

router.get('/restaurant/:restaurantId', foodController.getFoodByRestaurant); // get food route by RESTAURANT ID

router.get('/recommendation/"code', foodController.getRandomFoodByCode); // get random food route by CODE

router.put('/:id', verifyVendor, foodController.updateFood); // update food route -- ONLY VENDORS AND ADMIN






module.exports = router;