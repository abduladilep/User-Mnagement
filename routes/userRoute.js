const express = require('express')
const { model } = require('mongoose')
const auth = require("../middleware/auth")


const user_route = express()

user_route.set('view engine', 'ejs')
user_route.set('views', './views/users')
const bodyParser = require('body-parser')

user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({ extended: true }))


const userController = require('../controllers/userController')

user_route.get('/login', userController.loadLogin)

user_route.post('/login', userController.loginPost);

user_route.get('/register', userController.loadRegister)

user_route.post('/registerpost', userController.insertUser)

user_route.get("/adminlogin", userController.addadmin);

user_route.post("/adminloginpost", userController.addadminpost);

user_route.post("/logout", userController.logoutGet);

user_route.get('/useradmin', userController.useradmin)


user_route.get('/home', userController.homePage)


// user_route.post("/logoutpost", userController.logoutpost);

user_route.get('/updateuser/:id', userController.updateuser)

user_route.use(auth)
user_route.post('/updateuserpost/:id', userController.updateuserpost)




user_route.get('/userdata', userController.userdata)


user_route.post('/deleteuser/:id', userController.deleteuser)

user_route.post('/search', userController.search)





module.exports = user_route