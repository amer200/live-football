const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
    try {
        const { name, phone, email, password, durationInDays } = req.body;
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + durationInDays);
        const isPhoneUsed = await User.findOne({ phone: phone });
        if (isPhoneUsed) return res.status(400).json({ message: "رقم الهاتف مستخدم بالفعل" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            phone: phone,
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