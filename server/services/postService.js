import Post from '../models/postModel.js';
import errorMessages from '../constants/errormessages.js';
import calculateReadTime from '../utils/common.js';
import User from '../models/userModel.js';
class PostService {
  async createPost(data, userId) {
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

}

export default new PostService();
