const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.isAuthWithRoles = (allowedRoles) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(400).json({ msg: "token is required" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(400).json({ msg: err });
            }

            const userRole = decoded.data.user.rolle;
            if (allowedRoles.includes(userRole)) {
                req.user = decoded.data.user;
                return next();
            } else {
                return res.status(405).json({ msg: "not allowed" });
            }
        });
    }
}