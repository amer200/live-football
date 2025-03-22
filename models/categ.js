const mongoose = require("mongoose");

const categSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
})

const Categ = mongoose.model("Categ", categSchema);

module.exports = Categ;