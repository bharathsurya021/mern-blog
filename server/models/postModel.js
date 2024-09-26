import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tags: [{ type: String }],
    description: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    author: { type: String, required: true },
    likes: { type: Number, default: 0 },
    readTime: { type: String },
    archived: { type: Boolean, default: false },
    drafts: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
