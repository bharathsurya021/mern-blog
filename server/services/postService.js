import Post from '../models/postModel.js';
import errorMessages from '../constants/errormessages.js';
import { calculateReadTime, getFilterQuery, getSortOptions, validateObjectId } from '../utils/common.js';
import User from '../models/userModel.js';
class PostService {
  async createPost(data, userId) {

    if (!validateObjectId(userId)) {
      const err = new Error(errorMessages.invalidId.message);
      err.code = errorMessages.invalidId.code;
      throw err;
    }


    const { title, description } = data;

    if (!title || !description) {
      const err = new Error(errorMessages.postRequired.message);
      err.code = errorMessages.postRequired.code;
      throw err;
    }
    const readTime = calculateReadTime(description);

    const author = await User.findById(userId);
    if (!author) {
      const err = new Error(errorMessages.authorNotFound.message);
      err.code = errorMessages.authorNotFound.code;
      throw err;
    }

    const post = new Post({ ...data, authorId: userId, author: author?.name, readTime });

    try {
      return await post.save();
    } catch (error) {
      const err = new Error(errorMessages.postCreationFailed.message);
      err.code = errorMessages.postCreationFailed.code;
      throw err;
    }
  }

  async deletePostById(postId) {

    if (!validateObjectId(postId)) {
      const err = new Error(errorMessages.invalidId.message);
      err.code = errorMessages.invalidId.code;
      throw err;
    }

    const post = await Post.findById(postId)

    if (!post) {
      const err = new Error(errorMessages.postNotFound.message);
      err.code = errorMessages.postNotFound.code;
      throw err;
    }

    try {
      await post.deleteOne();
    } catch (error) {
      const err = new Error(errorMessages.postDeletionFailed.message);
      err.code = errorMessages.postDeletionFailed.code;
      throw err;
    }

  }

  async getPostById(postId) {

    if (!validateObjectId(postId)) {
      const err = new Error(errorMessages.invalidId.message);
      err.code = errorMessages.invalidId.code;
      throw err;
    }
    const post = await Post.find({ _id: postId }, { authorId: 0 })

    if (!post || post.length === 0) {
      const err = new Error(errorMessages.postNotFound.message);
      err.code = errorMessages.postNotFound.code;
      throw err;
    }

    try {
      return post;
    } catch (error) {
      const err = new Error(errorMessages.postDeletionFailed.message);
      err.code = errorMessages.postDeletionFailed.code;
      throw err;
    }

  }
  async getAll(options = {}) {
    const { filterOptions = {}, sortOptions = {} } = options;
    const { tags = [], author = "", keyword = "" } = filterOptions;
    const { sortBy = 'createdAt', order = 'desc' } = sortOptions;

    const sortObj = getSortOptions(sortBy, order);
    const filterQuery = getFilterQuery(tags, author, keyword);

    try {
      const posts = await Post.find(filterQuery, { authorId: 0 }).sort(sortObj);
      return posts;
    } catch (error) {
      const err = new Error(errorMessages.postFetchFailed.message);
      err.code = errorMessages.postFetchFailed.code;
      throw err;
    }
  }

  async updatePost(postId, postData) {

    if (!validateObjectId(postId)) {
      const err = new Error(errorMessages.invalidId.message);
      err.code = errorMessages.invalidId.code;
      throw err;
    }

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      const err = new Error(errorMessages.postNotFound.message);
      err.code = errorMessages.postNotFound.code;
      throw err;
    }

    const { title, description, tags, readTime } = postData;

    if (!title || !description) {
      const err = new Error(errorMessages.postRequired.message);
      err.code = errorMessages.postRequired.code;
      throw err;
    }
    let updatedTags
    if (!tags) {
      updatedTags = []
    } else {
      updatedTags = tags
    }

    const updatedReadTime = calculateReadTime(description);

    try {

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          description,
          tags: updatedTags,
          readTime: updatedReadTime,
        },
        { new: true }
      );

      return updatedPost;

    } catch (error) {
      const err = new Error(errorMessages.postUpdateFailed.message);
      err.code = errorMessages.postUpdateFailed.code;
      throw err;
    }
  }

}

export default new PostService();
