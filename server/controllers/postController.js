import asyncHandler from 'express-async-handler';
import postService from '../services/postService.js';

class PostController {
  createPost = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const postData = req.body;
    await postService.createPost(postData, userId);
    res.status(201).json({
      message: 'Post created successfully',
    });
  });

  deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await postService.deletePostById(id);
    res.status(200).json({
      message: 'Post Deleted successfully',
    });
  });

  getPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await postService.getPostById(id);
    res.status(200).json({
      message: 'Post retrieved successfully',
      data: post
    });
  });


}

export default new PostController();
