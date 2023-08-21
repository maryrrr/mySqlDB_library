const express = require('express')
const router = express.Router()
const GenreController = require('../controllers/GenreController')

router.post('/',GenreController.insert)


module.exports = router;