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

  getAllPosts = asyncHandler(async (req, res) => {
    const { tags, author, keyword, sortBy, order } = req.query;
    const processedTags = tags ? tags.split(',') : [];
    const filterOptions = {
      tags: processedTags,
      author: author || '',
      keyword: keyword || ''
    };

    const sortOptions = {
      sortBy: sortBy || 'createdAt',
      order: order || 'desc'
    };
    const options = { filterOptions, sortOptions };

    const posts = await postService.getAll(options);
    if (posts.length > 0) {
      res.status(200).json({
        message: 'Posts retrieved successfully',
        data: posts
      });
    } else {
      res.status(404).json({
        message: 'No posts found',
        data: posts
      });
    }

  });

  updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const postData = req.body;
    await postService.updatePost(id, postData)
    res.status(200).json({
      message: 'Post updated successfully',
    });
  })



}

export default new PostController();
