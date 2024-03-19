const router = require('express').Router();

const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController')

router.use('/users', userController)
router.use('/admin', adminController)

module.exports = router;