const express = require('express');
const router = express.Router();
const userRoutes = require('./User.router')
const postRoutes = require('./Post.router')
const categories = require('./Category.router')

router.use('/users', userRoutes)
router.use('/posts', postRoutes)
router.use('/posts', categories)

module.exports = router