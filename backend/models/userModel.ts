import { Schema, model, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUserDocument, IUserModel } from "../interface";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    news: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User not exists");
  } else {
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      return user;
    } else {
      throw new Error("Provided credentials are not valid");
    }
  }
};

userSchema.pre("save", async function (this: any, next) {
  let user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
  next();
});

export const UserModel = model<IUserDocument, IUserModel>("User", userSchema);

export default UserModel;
