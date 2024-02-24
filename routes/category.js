const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const { verifyAdmin } = require('../middlewares/verifyToken');


router.post('/', verifyAdmin, categoryController.createCategory); // Create a new category 

router.put('/:id', verifyAdmin, categoryController.updateCategory); // Update a category

router.delete('/:id', verifyAdmin, categoryController.deleteCategory); // Delete a category

router.get('/', categoryController.getAllCategories); // Get all categories

router.get('/random', categoryController.getRandomCategories); // Get random categories

router.patch('/:id', verifyAdmin, categoryController.patchCategoryImage); // Patch the category image



module.exports = router;