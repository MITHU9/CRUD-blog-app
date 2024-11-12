const mongoose = require("mongoose");
const Blog = require("../model/Blog");

// Get all blogs
const getAllBlogs = async (req, res) => {
  let blogList;

  try {
    blogList = await Blog.find();
  } catch (error) {
    console.log(error);
  }
  if (!blogList) {
    res.status(404).json({ message: "No blogs found" });
  }

  return res.status(200).json({ blogList });
};

// Create a new blog
const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const newDate = new Date();

  const newBlog = new Blog({
    title,
    content,
    date: newDate,
  });

  try {
    await newBlog.save();
  } catch (error) {
    console.log(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session: session });
    session.commitTransaction();
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ newBlog });
};

//Update a blog
const updateBlog = async (req, res) => {
  const { title, content } = req.body;
  const blogId = req.params.id;

  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      content,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error updating blog! please try again.." });
  }

  if (!blog) {
    return res.status(404).json({ message: "Unable to update.." });
  }

  return res.status(200).json({ blog });
};

// Delete a blog

const deleteBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting blog" });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
