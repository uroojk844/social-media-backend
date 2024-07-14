import express from "express";
export const post = express.Router();
import { Post } from "../model/posts.model.js";

post.get("/", async (req, res) => {
  return Post.find().sort({'createdAt': 'desc'})
    .populate("userid", ["_id", "name", "username"])
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

post.post("/like", async (req, res) => {
  const { postid, userid } = req.body;

  const isLiked = await Post.exists({
    _id: postid,
    likes: { $in: [userid] },
  });

  return await Post.findOneAndUpdate(
    { _id: postid },
    { [isLiked ? "$pull" : "$push"]: { likes: userid } },
    { new: true }
  )
    .then((success) => res.json({ success }))
    .catch((error) => res.json(error));
});

post.post("/", async (req, res) => {
  let data = await req.body;
  const post = Post(data);
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
