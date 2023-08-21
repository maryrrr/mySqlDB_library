const express = require('express')
const router = express.Router()
const BookController = require('../controllers/BookController')

router.post('/',BookController.insert)
router.get('/getAll',BookController.getAll)
router.delete('/:id',BookController.delete)
router.put('/:id',BookController.update)

module.exports = router;