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