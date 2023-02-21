const expres = require('express')
const mongoose = require("mongoose")
const app = expres()
const cookieParser = require("cookie-parser");
// const methodOverride = require('method-override')
const userRoute = require('./routes/userRoute')

app.use(cookieParser());

app.use(function (req, res, next) {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});

app.use('/users', userRoute)


app.get("*", (req, res, next) => {
    res.send("404, Not Found").status(404);
});
6
 
// app.use(methodOverride("_method"))

mongoose.connect('mongodb://127.0.0.1:27017/users?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4').then(() => {
    app.listen(3003, () => { console.log("Server is running") })
})
    .catch((err) => {
        console.log('there is error')
        console.error(err)
    })






