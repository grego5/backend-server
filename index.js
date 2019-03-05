try {
  require("dotenv").config();
} catch (err) {
  console.log(err.message);
}

const PORT = process.env.PORT;
const IP = process.env.IP;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const todoRoutes = require("./routes/todos");

const { isLoggedIn, isAuthorized } = require("./middleware/auth");
const path = require("path");

app.use(bodyParser.json());

// index
app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, "build", "index.html"));
});

// api routes
app.use("/api/blog/auth", authRoutes);
app.use("/api/blog/user/:id/post", isLoggedIn, isAuthorized, postRoutes);
app.use("/api/blog/posts", isLoggedIn, postRoutes);

app.use("/api/todos", todoRoutes);

// frontend app routes
const pathStore = {
   blog: path.join(__dirname, "build", "blog"),
   calc: path.join(__dirname, "build", "calc"),
   todos: path.join(__dirname, "build", "todos"),
   hackeru: path.join(__dirname, "build", "hackeru"),
}

for (k in pathStore) {
   app.use("/static", express.static(path.join(pathStore[k], "static")));
}

app.get("/blog", function(req, res) {
  res.sendFile(path.join(pathStore.blog, "index.html"));
});
app.get("/calc", function(req, res) {
  res.sendFile(path.join(pathStore.calc, "index.html"));
});
app.get("/todos", function(req, res) {
  res.sendFile(path.join(pathStore.todos, "index.html"));
});
app.get("/hackeru", function(req, res) {
  res.sendFile(path.join(pathStore.hackeru, "index.html"));
});

app.use(function(req, res, next) {
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, IP, function() {
  console.log(`Server listening for requests on ${IP}:${PORT}`);
});
