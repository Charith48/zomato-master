// Packages
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Models
import { UserModel } from "../../database/user"

const Router = express.Router();

/*
Route       - /signup
Description - Signup with email and password
Params      - None
Access      - Public
Method      - POST
*/

Router.post("/signup", async(req, res) => {
    try {
        // Check whether email or phone number already exists.
        await UserModel.findEmailAndPhone(req.body.credentials);

        // DataBase
        const newUser = await UserModel.create(req.body.credentials);

        // JWT Auth Token
        const token = newUser.generateJwtToken();

        return res.status(200).json({token});
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route       - /signin
Description - Signin with email and password
Params      - None
Access      - Public
Method      - POST
*/

Router.post("/signin", async(req, res) => {
    try {
        // Check whether email or phone number already exists.
        const user = await UserModel.findEmailAndPassword(req.body.credentials);

        // JWT Auth Token
        const token = user.generateJwtToken();

        return res.status(200).json({ token, status: "Success!!"});
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;