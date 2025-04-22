const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
    try {
        const { name, username, email, password, durationInDays } = req.body;
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + durationInDays);
        const isUserNameUsed = await User.findOne({ username: username });
        console.log(username)
        if (isUserNameUsed) return res.status(400).json({ message: "اسم المستخدم موجود !!" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
            email: email,
            subscriptionExpiresAt: expiresAt
        })
        await newUser.save()
        return res.status(200).json({
            msg: "تم انشاء حساب المشترك",
            data: newUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}
exports.logIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user || !bcrypt.compareSync(password, user.password)) return res.status(400).json({ message: "رقم الهاتف او كلمة المرور خطاء!" });
        if (new Date(user.subscriptionExpiresAt).getTime() < Date.now()) return res.status(400).json({ message: "انتهت مدة الاشتراك تواص مع الادارة للتجديد!" })
        const u = {
            id: user._id,
            name: user.name,
            username: user.username,
            subscriptionExpiresAt: user.subscriptionExpiresAt,
            rolle: "user"
        }
        const token = jwt.sign({
            expiresIn: '7d',
            data: { user: u },
        }, process.env.ACCESS_TOKEN);
        user.token = token;
        await user.save();
        return res.status(200).json({
            msg: "ok",
            token: token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}
exports.updateExtendSubscription = async (req, res) => {
    try {
        const { userId, durationInDays } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ message: "المستخدم غير موجود" });
    
        const currentDate = new Date();
        const currentExpiration = user.subscriptionExpiresAt;
    
        // نحدد هل نزود من دلوقتي ولا من تاريخ الاشتراك الحالي
        const baseDate = currentExpiration > currentDate ? currentExpiration : currentDate;
    
        // نزود عدد الأيام
        const newExpiration = new Date(baseDate);
        newExpiration.setDate(newExpiration.getDate() + durationInDays);
    
        user.subscriptionExpiresAt = newExpiration;
        await user.save();
    
        return res.status(200).json({
            msg: "ok",
            data: user.subscriptionExpiresAt
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
    // try {
    //     const { userId, durationInDays } = req.body;
    //     const user = await User.findById(userId);
    //     if (!user) return res.status(400).json({ message: "المستخدم غير موجود" });
    //     const expiresAt = new Date();
    //     expiresAt.setDate(expiresAt.getDate() + durationInDays);
    //     user.subscriptionExpiresAt = expiresAt;
    //     await user.save();
    //     return res.status(200).json({
    //         msg: "ok",
    //         data: user.subscriptionExpiresAt
    //     })
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({ message: "خطأ في السيرفر", error: error });
    // }
}
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            msg: "ok",
            data: users
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}