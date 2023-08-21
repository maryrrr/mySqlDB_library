const { User ,Token,Sequelize} = require('../models/index.js')
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
const { Op} = Sequelize;


const { jwt_secret } = require('../config/config.json')['development']

const UserController = {
    create(req, res) {
        req.body.role = "user"
        const password = bcrypt.hashSync(req.body.password,10)
        User.create({...req.body,password})
        .then(user => res.status(201)
        .send({ message: 'User created successfully', user }))
        .catch(console.error)
    },
    login(req,res){

        User.findOne({
            where:{
                email:req.body.email
        }
        }).then(user=>{
            if(!user){
                return res.status(400).send({message:"Incorrect username or password"})
        }
        const isMatch = bcrypt.compareSync(req.body.password, user.password);
        
        if(!isMatch){
            return res.status(400).send({message:"Incorrect username or password"})
        }
        const token = jwt.sign({ id: user.id }, jwt_secret)
        Token.create({ token, UserId: user.id });
        res.send({ message: 'Welcome@ ' + user.name, user, token });
        })
    },
    async delete(req, res) {
		await User.destroy({
			where: {
				id: req.params.id,
			},
		})
		res.send('The user has been successfully deleted')
	},
    async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                    { UserId: req.user.id },
                    { token: req.headers.authorization }
                ]
            }
        })
        res.send({ message: 'Disconnected successfully' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'There was a problem trying to logout' })
        }
    }
}

module.exports = UserController