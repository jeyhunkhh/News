import express, { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import News from "../models/newsModels";
import { INews } from "../interface";
import { requireAuth } from "../helpers/verifyToken";
import jwt_decode from "jwt-decode";

export const UserRouter = express.Router();

// getReadList
UserRouter.get("/", requireAuth, async (req, res) => {
  try {
    const authToken = req.headers["authorization"];
    if (!authToken) return res.status(401);
    const user: any = jwt_decode(authToken);
    const userInfo = await User.findById(user._id);
    if (!userInfo) {
      res.status(404).json({ message: "Not found" });
    } else {
      User.findById(user._id)
        .populate("news")
        .exec((err, user) => {
          res.json(user?.news);
        });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Apply song
UserRouter.post("/read-list", requireAuth, async (req, res) => {
  try {
    const authToken = req.headers["authorization"];
    if (!authToken) return res.status(401);
    const user: any = jwt_decode(authToken);
    const userInfo = await User.findById(user._id);
    if (!userInfo) {
      res.status(404).json({ message: "Not found" });
    } else {
      const news: INews = req.body;
      await User.updateOne(
        { _id: user._id },
        {
          $addToSet: { news: news },
        }
      );
      res.json("Ok");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

UserRouter.delete("/read-list/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);

    if (!news) {
      res.status(404).json({ message: "Not found" });
    }
    const authToken = req.headers["authorization"];
    if (!authToken) return res.status(401);
    const user: any = jwt_decode(authToken);
    const userInfo = await User.findById(user._id);

    if (!userInfo) {
      res.status(404).json({ message: "Not found" });
    } else {
      User.findByIdAndUpdate(userInfo._id, {
        $pull: { news: req.params.id },
      })
        .then(async (users: any) => {
          if (!users) {
            return res.status(404).send();
          }
        })
        .catch((error: Error) => {
          res.status(500).send(error);
        });

      res.json({ message: "Deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
