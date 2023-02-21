const { findByIdAndUpdate } = require('../models/userModel');
const User = require('../models/userModel')
//sconst bcrypt = require('bcrypt')



let msg = "";

let showUser = ""


const loadLogin = (req, res) => {
    console.log("dfndjfn");
   if(req.cookies.userId){
    res.redirect('/users/home')
    
   }else{

   
    res.render('login', { message: msg })
    msg = ""
   }
}




const loadRegister = async (req, res) => {
    // try {
    res.render('registration')
    // } catch (error) {
    //     console.log(error.message)
    // }
}
const homePage = (req, res) => {
    if (req.cookies.userId && req.cookies.userType == "user") {
        res.render("home");
    } else {
        res.redirect('/users/login')
    }
}



const insertUser = async (req, res) => {
    console.log(req.body)
    try {
        const user = new User({
            Firstname: req.body.Firstname,
            Lastname: req.body.Lastname,
            Email: req.body.Email,
            Password: req.body.Password,
            is_admin: 0

        })
        const userData = await user.save()
        res.redirect("/users/login")


    } catch (error) {
        console.log(error.message)
        res.status(500).send(error)
    }

}

const loginPost = async (req, res, next) => {
    const { Email, Password } = req.body;
    console.log(Email, Password)
    const consumer = await User.findOne({ Email, Password });

    try {
        console.log('j')
        if (Email == consumer.Email && Password == consumer.Password) {
            console.log("check")

            let type = "user"

            res.cookie("userId", Email, {
                maxAge: 2 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.cookie("userType", type, {
                maxAge: 2 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.redirect("/users/home");

        }
    } catch (error) {
        msg = "Invalid username or password";
        res.redirect("/users/login");
    }
    next()
};


const logoutGet = (req, res) => {
    try {
        res.clearCookie("userId")
        res.clearCookie("userType")
        res.redirect("/users/login");
    } catch (error) {
        console.log(error.message)

    }
};


// const logoutpost = (req, res) => {

//     try {
//         res.clearCookie("userId")
//         res.clearCookie("userType")

//         res.redirect("/users/login");

//     } catch (error) {
//         console.log(error.message)

//     }

// }

const addadmin = (req, res) => {
    // if(req.cookies.userType==='admin'){
    //     res.redirect('/users/userdata')
    //    }else{
        if(req.cookies.userId){
            res.redirect("/users/userdata")
           }else{
               res.render('adminlogin');
    
            
           }
       
       }
    


const userdata = async (req, res) => {
    console.log(req.cookies.userId)
    if (req.cookies.userId && req.cookies.userType == "admin") {
        console.log("cookie")
        res.render('userdata', { data: showUser })
        showUser = await User.find()
    } else {
        
        res.redirect('/users/adminlogin')
    }
}
const useradmin = async (req, res) => {
    showUser = await User.find()
    console.log(showUser)
    res.redirect("/users/userdata")

}


const search = async (req, res) => {
    const searchdata = req.body.search
    showUser = await User.find({

        // Firstname: searchdata
        $or: [
            { Firstname: { $regex: ".*" + searchdata + ".*" } },
            { Lastname: { $regex: ".*" + searchdata + ".*" } },

        ],
    })



    res.redirect('/users/userdata')

}


const deleteuser = async (req, res) => {
    const { id } = req.params
    try {
        console.log("deleting")
        await User.findByIdAndDelete(id)
        res.redirect('/users/userdata')
    } catch (error) { }

}


const updateuser = async (req, res) => {
    const { id } = req.params

    const datas = await User.findById(id)
    console.log("update")
    res.render('userEdit', { datas })


}

const updateuserpost = async (req, res) => {
    const { id } = req.params
    console.log('edited')
    const edituser = req.body
    await User.findByIdAndUpdate(id,{ $set: edituser })
    res.redirect('/users/userdata')
}



const addadminpost = async (req, res) => {
    const admin = { Email: "admin@gmail.com", Password: "admin123" }

    const { Email, Password } = req.body
    console.log(req.body)
    try {
        console.log("inside admin try")
        if (Email == admin.Email && Password == admin.Password) {
            console.log("admin verified")
            let type = "admin"

            res.cookie("userId", Email, {
                maxAge: 2 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.cookie("userType", type, {
                maxAge: 2 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.redirect('/users/useradmin')
        } else {
            res.send("Invalid username or password")
        }
        // const adminData = await User.save()


    } catch (error) {
        console.log(error.message)
        res.status(500).send(error)
    }

}




module.exports = { loadRegister, insertUser, loadLogin, homePage, logoutGet, loginPost, addadmin, addadminpost, useradmin, updateuser, updateuserpost, deleteuser, search, userdata }