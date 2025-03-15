const jwt = require("jsonwebtoken");
exports.logIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email == process.env.ADMINEMAIL) {
        if (password == process.env.ADMINPASS) {
            const user = {
                id: 1,
                name: "admin",
                rolle: "admin"
            }
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: { user: user },
            }, process.env.ACCESS_TOKEN);
            return res.status(200).json({
                msg: "ok",
                token: token
            })
        }
    }
    if (process.env.ADMINPASS == password) {
        const user = {
            id: 1,
            name: "admin",
            rolle: "admin"
        }
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: { user: user },
        }, process.env.ACCESS_TOKEN);
        return res.status(200).json({
            msg: "ok",
            token: token
        })
    } else {
        res.status(400).json({
            msg: "wrong password or email"
        })
    }
}