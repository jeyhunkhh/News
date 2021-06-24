import { Router, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import * as yup from "yup";
import { IAuthPayload, IUser } from "../interface";
import UserModel from "../models/userModel";

dotenv.config();

enum Roles {
  Admin = "Admin",
  User = "User",
}

export const AuthRouter = Router();
let regPayloadSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  fullname: yup.string().required(),
});

let authPayloadSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const JWT_SECRET = process.env.JWT_SECRET_KEY || "";

AuthRouter.post("/register", async (req, res) => {
  const registerPayload: IUser = { ...req.body, role: Roles.User };
  try {
    try {
      const validPayload = await regPayloadSchema.validate(registerPayload);
      const newUserObj = new UserModel(validPayload);
      const newUser = await newUserObj.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
      });
    } catch (error) {
      res.status(422).json({ errors: [error.message] });
    }
  } catch (err) {
    res.status(422).json({ errors: err.errors });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const loginPayload: IAuthPayload = req.body;

  try {
    const validPayload = await authPayloadSchema.validate(loginPayload);

    try {
      const user = await UserModel.login(
        validPayload.email,
        validPayload.password
      );
      const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({
        access_token: token,
        user: {
          _id: user._id,
          email: user.email,
          fullname: user.fullname,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(422).json({ errors: [error.message] });
    }
  } catch (err) {
    console.error(err);
    res.status(422).json({ errors: err.errors });
  }
});
