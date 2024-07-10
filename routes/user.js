import express from "express";
import { User } from "../models/users.model.js";

export const users = express.Router();

users.get("/", async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

users.get("/:id", async (req, res) => {
  const { id } = req.params;
  return await User.findById(id)
    .then((user) => {
      return res.json({ success: user });
    })
    .catch((err) => {
      return res.json({ error: "User does not exists!!" });
    });
});

users.post("/", async (req, res) => {
  const user = new User(req.body);
  return user
    .save()
    .then((user) => {
      return res.json({ success: user });
    })
    .catch((err) => {
      return res.json({ error: "Something went wrong!" });
    });
});
