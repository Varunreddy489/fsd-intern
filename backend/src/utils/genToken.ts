import { Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { Types } from "mongoose";

const generateTokenAndSetCookie = (userId: Types.ObjectId | string, res: Response) => {

    const JWT_SECRET = process.env.JWT_SECRET as Secret;

    const token = jwt.sign({ userId: userId.toString() }, JWT_SECRET, {
        expiresIn: "15d",
    });

    console.log(token);

    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // CSRF protection
        secure: process.env.NODE_ENV !== "development",
    });
};

export default generateTokenAndSetCookie;


