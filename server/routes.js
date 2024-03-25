const router = require('express').Router();

const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController')
const recipeController = require('./controllers/recipeController');

router.use('/users', userController)
router.use('/admin', adminController)
router.use(recipeController)

module.exports = router;