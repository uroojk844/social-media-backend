import mongoose from "mongoose";
import express from "express";

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
  console.log("hi");
});

app.listen(3000, (req, res) => {
  console.log("Running");
});
