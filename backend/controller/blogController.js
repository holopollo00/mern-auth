const Blog = require("../models/Blog.js");

const blogController = {
  // Create a new blog
  createBlog: async (req, res) => {
    try {
      const newBlog = await Blog.create(req.body);
      res.status(201).json(newBlog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all blogs
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get blog by ID
  getBlogById: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update blog by ID
  updateBlogById: async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete blog by ID
  deleteBlogById: async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = blogController;
