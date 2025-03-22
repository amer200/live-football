const Match = require("../models/match");
const Categ = require("../models/categ");

exports.addCateg = async (req, res) => {
    try {
        const name = req.body.name;
        const categ = new Categ({
            name: name
        })
        await categ.save()
        return res.status(200).json({
            msg: "ok",
            data: categ
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}
exports.editCateg = async (req, res) => {
    try {
        const { id, name } = req.body;
        const categ = await Categ.findById(id);
        categ.name = name;
        await categ.save()
        return res.status(200).json({
            msg: "ok",
            data: categ
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}
exports.removeCateg = async (req, res) => {
    try {
        const id = req.params.id;
        await Categ.findByIdAndDelete(id);
        return res.status(200).json({
            msg: "ok",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}
exports.getAllCateg = async (req, res) => {
    try {
        const categs = await Categ.find();
        return res.status(200).json({
            msg: "ok",
            data: categs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}
exports.getCategById = async (req, res) => {
    try {
        const id = req.params.id;
        const categ = await Categ.findById(id);
        return res.status(200).json({
            msg: "ok",
            data: categ
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}
exports.getCategByName = async (req, res) => {
    try {
        const name = req.params.name;
        const categ = await Categ.findOne({ name: name });
        return res.status(200).json({
            msg: "ok",
            data: categ
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}