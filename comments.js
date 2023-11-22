// Create web server
// Load comments from json file
// Save comments to json file

const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

// Load comments from json file
const comments = require("./comments.json");

// Create web server
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get comments
app.get("/comments", (req, res) => {
  res.json(comments);
});

// Add comment
app.post("/comments", (req, res) => {
  const comment = req.body;
  comments.push(comment);
  saveComments(comments);
  res.json(comment);
});

// Delete comment
app.delete("/comments/:id", (req, res) => {
  const id = Number(req.params.id);
  const newComments = comments.filter((comment) => comment.id !== id);
  saveComments(newComments);
  res.json(id);
});

// Save comments to json file
const saveComments = (comments) => {
  const jsonComments = JSON.stringify(comments, null, 2);
  fs.writeFile("./comments.json", jsonComments, (err) => {
    if (err) throw err;
    console.log("Comments saved");
  });
};

// Start web server
app.listen(port, () => console.log(`Server listening on port ${port}`));