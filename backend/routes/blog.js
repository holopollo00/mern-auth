const express = require('express');
const router = express.Router();

const blogController = require('../controller/blogController.js');

// Create a new blog
router.post('/', blogController.createBlog);

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get blog by ID
router.get('/:id', blogController.getBlogById);

// Update blog by ID
router.put('/:id', blogController.updateBlogById);

// Delete blog by ID
router.delete('/:id', blogController.deleteBlogById);

module.exports = router;
