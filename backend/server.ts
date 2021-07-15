import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ROUTES from "./routes";

dotenv.config();

const uri = process.env.MONGO_URI || "";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("db connected"));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello News Api...");
});

const PORT: string | number = process.env.PORT || 8000;

ROUTES.forEach(({ path, router }) => {
  app.use(path, router);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
