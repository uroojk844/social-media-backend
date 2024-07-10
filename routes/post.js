import express from "express";
export const post = express.post();
import { Post } from "../models/posts.model.js";

post.get("/", async (req, res) => {
  return Post.find()
    .populate("userid", ["_id", "name"])
    .then((posts) => res.send(posts))
    .catch((error) => res.json(error));
});

post.get("/:id", async (req, res) => {
  const id = req.params.id;
  return Post.findById(id)
    .then((post) => post.populate("userid", ["name", "username"]))
    .then((success) => res.json({ success }))
    .catch((error) => res.json(error));
});

const userid = "668d3e4ef1bdb74c3c183e98";

post.get("/like/:id", async (req, res) => {
  const id = req.params.id;

  const isLiked = await Post.exists({
    _id: id,
    likes: { $in: [userid] },
  });

  return await Post.findOneAndUpdate(
    { _id: id },
    { [isLiked ? "$pull" : "$push"]: { likes: userid } },
    { new: true }
  )
    .then((success) => res.json({ success }))
    .catch((error) => res.json(error));
});

post.post("/", async (req, res) => {
  let data = await req.body;
  const post = Post({ ...data, userid: userid });
  return post
    .save()
    .then((s) => s.populate("userid"))
    .then((post) => {
      return res.json({ success: post });
    })
    .catch((error) => {
      return res.json({ error: error });
    });
});

post.delete("/:id", async (req, res) => {
  const { id } = req.params;
  return await Post.deleteOne({ _id: id })
    .then(() => res.send({ success: id }))
    .catch((error) => res.send({ error }));
});
