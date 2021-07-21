require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./utils/db");
const cors = require("cors");

const app = express();

app.use(express.json());
// app.use(express.static(path.join(__dirname, "client/build")));
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:3000"],
    credentials: true
}));


app.use("/auth", require("./routes/auth"));
app.use("/teacher", require("./routes/teacher"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
});