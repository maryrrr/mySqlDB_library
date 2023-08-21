const { Genre,Book } = require('../models/index.js')

const GenreController = {
    insert(req,res){
        Genre.create(req.body)
        .then(genre=>{
           genre.addBook(req.body.BookId)
           res.send(genre)
        })  
        .catch(err => console.error(err))
    },
    
}

module.exports = GenreController;
