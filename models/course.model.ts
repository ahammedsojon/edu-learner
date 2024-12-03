import mongoose, { model, models, Schema, Types } from "mongoose";

export interface ICourse {
  title: string;
  subTitle: string;
  slug: string;
  description: string;
  price: number;
  thumbnail: string;
  category: Types.ObjectId;
  tags: Types.ObjectId[];
  instructor: Types.ObjectId;
  modules: Types.ObjectId[];
  published: boolean;
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: false },
  category: { type: Schema.Types.ObjectId, required: false },
  tags: [{ type: Schema.Types.ObjectId, required: false }],
  instructor: { type: Schema.Types.ObjectId, required: true },
  modules: [{ type: Schema.Types.ObjectId, required: false }],
  published: { type: Boolean, default: false, required: true },
});

export const Course = models.Course ?? model<ICourse>("Course", courseSchema);
