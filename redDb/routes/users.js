const express = require('express')
const router = express.Router()


const UserController = require('../controllers/UserController')
const {authentication,isAdmin} = require('../middlewares/authentication')

router.post('/',UserController.create)
router.post('/login',UserController.login)
router.delete('/id/:id',authentication,isAdmin,UserController.delete)
router.delete('/logout',authentication,UserController.logout)

module.exports = router;