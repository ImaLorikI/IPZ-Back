import { model, Schema } from "mongoose";


const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    author: {
      type: String,
    },
    genre: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  }
);


export const Books = model("books", bookSchema);
