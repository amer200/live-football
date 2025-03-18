const Team = require("../models/team");

exports.addNewTeam = async (req, res) => {
    try {
        const name = req.body.name;
        const image = req.file.path;
        const isNameUsed = await Team.findOne({ name: name });
        if (isNameUsed) return res.status(400).json({ message: "الفريق موجود !" });
        const newTeam = new Team({
            name: name,
            image: image
        })
        await newTeam.save();
        return res.status(200).json({
            msg: "تم اضافة القريق",
            data: newTeam
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}
exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        return res.status(200).json({
            msg: "ok",
            data: teams
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}
exports.editTeam = async (req, res) => {
    try {
        const { id, name } = req.body;
        const team = await Team.findById(id);
        if (req.file) {
            team.image = req.file.path
        }
        team.name = name;
        await team.save();
        return res.status(200).json({
            msg: "ok",
            data: team
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "خطأ في السيرفر", error: error });
    }
}