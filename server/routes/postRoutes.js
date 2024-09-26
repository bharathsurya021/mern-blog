import express from 'express';
import postController from '../controllers/postController.js';
import { admin, protect } from '../middleware/authmiddleware.js';

const router = express.Router();
router.route('/').post(protect, admin, postController.createPost).get(postController.getAllPosts)
router.route('/:id').delete(protect, admin, postController.deletePost).get(postController.getPost).put(protect, admin, postController.updateStatus)
export default router;
