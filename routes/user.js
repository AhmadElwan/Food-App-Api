const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyAndAuthorization } = require('../middlewares/verifyToken');


router.get('/', verifyAndAuthorization, userController.getUser); // get user route

router.delete('/', verifyAndAuthorization, userController.deleteUser); // delete user route 

router.put('/', verifyAndAuthorization, userController.updateUser); // update user route 



module.exports = router;