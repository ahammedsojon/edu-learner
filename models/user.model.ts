import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  gender: "male" | "female";
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  role: "instructor" | "student";
  avatar?: string;
  isDeleted: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female"],
      require: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    role: {
      type: String,
      enum: ["instructor", "student"],
      require: true,
    },
    avatar: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

// 3. Create a Model.
export const User = model<IUser>("User", userSchema);
