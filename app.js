require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const { connectDB } = require('./src/models/index.js');

const webRoute = require("./src/routes/api.js");

const app = express();

//middleware
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["get", "post", "put", "patch", "delete"],
    credentials: true
}));
app.use(express.json());

//set static
app.use(express.static(join(__dirname, "public")));

app.use("/", webRoute);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            status: err.status || 500,
            message: err.message || "Internal Server Error"
        }
    });
});

connectDB().then(() =>
    app.listen(3000, () => console.log("http://localhost:3000")));