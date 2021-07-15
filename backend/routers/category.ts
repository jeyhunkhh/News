import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import Category from "../models/categotyModel";
import { ICategory } from "../interface";
import News from "../models/newsModels";
import { requireAuth } from "../helpers/verifyToken";

export const CategoryRouter = express.Router();

CategoryRouter.use(cors());

// Get
CategoryRouter.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getById
CategoryRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const categories = await Category.findById(req.params.id);
    if (!categories) {
      res.status(404).json({ message: "Not found" });
    } else {
      const news = await News.find({ categoryId: id }).sort({ createdAt: -1 });
      const data = {
        categories,
        news,
      };
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create
CategoryRouter.post("/", requireAuth, async function (req, res) {
  const reqPayload: ICategory = req.body;
  const category = new Category(reqPayload);

  try {
    const insertedCategory = await category.save();
    res.status(201).json(insertedCategory);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }

  res.sendStatus(201);
});

// Update
CategoryRouter.patch("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    let category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ message: "Not found" });
    } else {
      await Category.findByIdAndUpdate(id, req.body, {
        useFindAndModify: true,
      });
      category = await Category.findById(id);
      res.json(category);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
CategoryRouter.delete("/:id", requireAuth, async function (req, res) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.sendStatus(404);
    } else {
      await category.remove();
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
