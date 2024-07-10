import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: String,
    data: {
      text: String,
      images: [String],
      video: [String],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        sparse: true,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    views: Number,
  },
  {
    timestamps: true,
  }
);

export const Post = new mongoose.model("Post", PostSchema);
