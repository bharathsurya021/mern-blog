import express from 'express';
import postController from '../controllers/postController.js';
import { admin, protect } from '../middleware/authmiddleware.js';

const router = express.Router();
router.route('/').post(protect, admin, postController.createPost)
router.route('/:id').delete(protect, admin, postController.deletePost).get(postController.getPost)
export default router;
