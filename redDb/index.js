const express=require('express')
const app=express()

const PORT=3000
app.use(express.json())

app.use('/users', require('./routes/users'))
app.use('/books',require('./routes/books'))
app.use('/genres',require('./routes/genres'))

app.listen(PORT,console.log(`Server  started at ${PORT}`))