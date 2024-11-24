const express = require('express');
const { addPost, addComment, getUserPosts } = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Add a new post
router.post('/', authenticateToken, addPost);

// Add a comment to a specific post
router.post('/:postId/comments', authenticateToken, addComment);

// Fetch all posts by a specific user
router.get('/user/:userId', authenticateToken, getUserPosts);

module.exports = router;
