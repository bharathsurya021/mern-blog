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

}

export default new PostController();
