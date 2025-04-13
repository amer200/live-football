const mongoose = require("mongoose");


const matchSchema = new mongoose.Schema({
    firstTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    secondTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    stadium: { type: String, required: true },
    date: { type: Date, required: true },
    categ: { type: mongoose.Schema.Types.ObjectId, ref: "Categ" },
    urls: [{ url: String, desc: String }]

})

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;