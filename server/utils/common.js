
import mongoose from 'mongoose';

export const calculateReadTime = (text) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  const readTimeInMinutes = Math.ceil(words / wordsPerMinute);
  return `${readTimeInMinutes} min read`;
};


export const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const getFilterQuery = (tags, author, keyword) => {
  let filterQuery = {};

  if (tags && tags.length > 0) {
    filterQuery.tags = { $in: tags };
  }

  if (author) {
    filterQuery.author = { $regex: new RegExp(author, 'i') };
  }

  if (keyword) {
    filterQuery.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }

  return filterQuery;
};

export const getSortOptions = (sortBy, order) => {
  const validSortFields = ['title', 'likes', 'createdAt'];
  const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
  const sortOrder = order === 'asc' ? 1 : -1;

  return { [sortField]: sortOrder };
};