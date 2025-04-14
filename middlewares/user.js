const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.isAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(400).json({
            msg: "token is requires"
        })
    }
    const myUser = await User.findOne({ token: token });
    if (!myUser) {
        return res.status(405).json({
            msg: "not allowed"
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        console.log(user)
        if (err) {
            return res.status(400).json({
                msg: err
            })
        }
        if (user.data.user.rolle == 'user') {
            req.user = user.data
            next();
        } else {
            res.status(405).json({
                msg: "not allowed"
            })
        }
    })
}

