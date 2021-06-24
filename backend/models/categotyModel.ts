import mongoose from "mongoose";

const catagorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Catecory = mongoose.model("Catecory", catagorySchema);

export default Catecory;
