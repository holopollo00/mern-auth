const userController = require('../controller/userController');
const middlewareController = require('../controller/middlewareController');

const router = require('express').Router();

router.get('/', middlewareController.verifyToken, userController.getAllUser);
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);


module.exports = router;