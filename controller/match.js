const Match = require("../models/match");
const Categ = require("../models/categ");

exports.addCateg = async (req, res) => {
    try {
        const name = req.body.name;
        const image = req.file.path;
        const categ = new Categ({
            name: name,
            img: image
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
        if (req.file) {
            categ.img = req.file.path;
        }
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
exports.addMatch = async (req, res) => {
    try {
        const { firstTeam, secondTeam, stadiumName, date, categ } = req.body;
        const urls = JSON.parse(req.body.urls);
        const img = req.file.path;
        const myMatch = new Match({ firstTeam: firstTeam, secondTeam: secondTeam, stadium: { name: stadiumName, img: img }, date: date, categ: categ, urls: urls });
        await myMatch.save()
        return res.status(200).json({
            msg: "ok",
            data: myMatch
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}

exports.getAllMatch = async (req, res) => {
    try {
        const matchs = await Match.find().populate("firstTeam").populate("secondTeam").populate("categ");
        return res.status(200).json({
            msg: "ok",
            data: matchs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}

exports.getMatchById = async (req, res) => {
    try {
        const id = req.params.id;
        const match = await Match.findById(id).populate("firstTeam").populate("secondTeam").populate("categ");
        return res.status(200).json({
            msg: "ok",
            data: match
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}
exports.addUrls = async (req, res) => {
    try {
        const urls = req.body.urls;
        const id = req.body.id;
        const match = await Match.findById(id);
        match.urls = urls;
        await match.save()
        return res.status(200).json({
            msg: "ok",
            data: match
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}
exports.removeMatch = async (req, res) => {
    try {
        const id = req.params.id;
        await Match.findByIdAndDelete(id);
        return res.status(200).json({
            msg: "ok",
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}