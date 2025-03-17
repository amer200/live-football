const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true }
});
const User = mongoose.model("Team", teamSchema);

module.exports = User;
