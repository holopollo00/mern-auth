import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  content: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
});

const Blogs = mongoose.model("Blog", blogsSchema);

export default Blogs;
