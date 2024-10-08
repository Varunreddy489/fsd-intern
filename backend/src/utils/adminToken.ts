import { Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { Types } from "mongoose";

const generateAdminTokenAndSetCookie = (userId: Types.ObjectId, res: Response) => {

    const JWT_SECRET = process.env.ADMIN_JWT_SECRET as Secret;

    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "15d",
    });

    console.log(token);

    res.cookie("cookie-token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // CSRF protection
        secure: process.env.NODE_ENV !== "development",
    });
};

export default generateAdminTokenAndSetCookie;