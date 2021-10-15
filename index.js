// env variable
require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

// API
import Auth from "./API/Auth/index";

// Database connection
import ConnectDB from "./database/connection";

// Initalize our app
const shimato = express();

shimato.use(express.json());
shimato.use(express.urlencoded({extended: false}));
shimato.use(helmet());
shimato.use(cors());

// For application routes
// localhost:5000/auth/signup
shimato.use("/auth", Auth);

shimato.get("/", (req, res) => {
    res.json({message: "Server is running!!!"});
});

shimato.listen(4000, () => {
    ConnectDB().then(() => {
        console.log("Server is running!!!");
    }).catch(() => console.log("DB connection failed"));
});