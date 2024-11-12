const express = require("express");
const blogRouter = express.Router();

const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog-controller");

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", createBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);

module.exports = blogRouter;
