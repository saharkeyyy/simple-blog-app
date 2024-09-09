import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  
  },
  image: {
    type: String,
    required: true,
  },
  postId: {
    type: [String],
  },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;
