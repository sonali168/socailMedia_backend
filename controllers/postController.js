const Post = require('../models/Post');

// Add a new post
const addPost = async (req, res) => {
  try {
    const { content, media } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const post = new Post({
      userId: req.user.id,
      content,
      media,
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: 'Error adding post', error: err.message });
  }
};

// Add a comment to a post
const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({ userId: req.user.id, content });
    const updatedPost = await post.save();

    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment', error: err.message });
  }
};

// Get all posts for a specific user
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const posts = await Post.find({ userId }).populate('comments.userId', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
};

module.exports = { addPost, addComment, getUserPosts };
