const express = require('express')
const router = express.Router();
const auth = require('../middlewares/auth');
const { createCategory, getCategories } = require('../controllers/Category.controller');

router.post('/', auth, createCategory)
router.get('/', auth, getCategories)