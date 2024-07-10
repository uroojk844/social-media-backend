import mongoose from "mongoose";
import express from "express";
import { post } from "./routes/post.js";
import { users } from "./routes/user.js";

mongoose
  .connect(
    "mongodb+srv://uroojk844:Erp123@cluster0.d7alzlz.mongodb.net/social?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Conneted to DB");
  })
  .catch((err) => console.log(err));

const app = express();
app.get("/", (req, res) => {
  return res.json("Hello World!");
});

app.use("/post", post);
app.use("/user", users);

app.listen(3000, (req, res) => {
  console.log("Running");
});
