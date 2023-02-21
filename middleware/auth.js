const auth = (req, res, next) => {
    if (!req.cookies.userId) {
        let err = new Error("You are not authenticated");
        res.setHeader("WWW-Authenticate", "Basic");
        err.status = 401;
        res.redirect("/users/login");
        return next(err);

    }
    return next();
};
module.exports = auth;