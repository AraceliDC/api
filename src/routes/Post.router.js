const express = require('express');
const router = express.Router();
const { createPost, getAllPost } = require('../controllers/Post.controller');

router.post('/', createPost);
router.get('/', getAllPost);

module.exports = router