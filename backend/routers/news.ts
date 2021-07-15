import express from "express";
import cors from "cors";
import News from "../models/newsModels";
import { INews } from "../interface";
import multer from "multer";
import { requireAuth } from "../helpers/verifyToken";
const { cloudinary } = require("../helpers/cloudinary");

export const NewsRouter = express.Router();

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

NewsRouter.use(cors());

// Get
NewsRouter.get("/", async (req, res) => {
  try {
    let searchQuery = req.query.searchQuery;
    const news = await News.find().sort({ createdAt: -1 });
    let result = news;

    if (searchQuery) {
      const searchCallBack = (newsItem: any) => {
        return newsItem.title
          .trim()
          .toLowerCase()
          .includes(searchQuery!.toString().trim().toLowerCase());
      };

      result = news.filter(searchCallBack);
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getById
NewsRouter.get("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(news);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create
NewsRouter.post(
  "/",
  requireAuth,
  upload.single("photo"),
  async function (req, res) {
    const result = await cloudinary.uploader.upload(req.file?.path);
    const reqPayload: INews = { ...req.body, photo: result.url };
    const news = new News(reqPayload);

    try {
      const insertedNews = await news.save();
      res.status(201).json(insertedNews);
    } catch (error) {
      res.status(422).json({ message: error.message });
    }

    res.sendStatus(201);
  }
);

// Update
NewsRouter.patch(
  "/:id",
  requireAuth,
  upload.single("photo"),
  async (req, res) => {
    const { id } = req.params;
    try {
      let news = await News.findById(id);
      if (!news) {
        res.status(404).json({ message: "Not found" });
      } else {
        if (req.file !== undefined) {
          const result = await cloudinary.uploader.upload(req.file?.path);
          await News.findByIdAndUpdate(
            id,
            { ...req.body, photo: result.url },
            {
              useFindAndModify: true,
            }
          );
        } else {
          await News.findByIdAndUpdate(id, req.body, {
            useFindAndModify: true,
          });
        }

        news = await News.findById(id);
        res.json(news);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Delete
NewsRouter.delete("/:id", requireAuth, async function (req, res) {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      res.sendStatus(404);
    } else {
      await news.remove();
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
