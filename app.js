const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: ".env" });
const { dbConnection } = require("./db/mongoose");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const multer = require('multer');
var cors = require('cors');
const app = express();

///////////////////////////////////////////
app.use(cors())
///////////////////////////////////////////
app.set("view engine", "ejs");
app.use(morgan("combined"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
//////////////////////////////////////////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.originalname;
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
const upload = multer({ storage: storage });
app.post("/team/add-new", upload.single("image"));
app.post("/team/edit-team", upload.single("image"));
app.post("/match/add-categ", upload.single("image"));
app.post("/match/edit-categ", upload.single("image"));
app.post("/match/add-new-match", upload.single("image"));
app.post("/match/edit-match", upload.single("image"));

//////////////////////////////////////////
//routes
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const teamRoutes = require("./routes/team");
const matchRoutes = require("./routes/match");

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/team", teamRoutes);
app.use("/match", matchRoutes);
//db onnection
dbConnection();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});