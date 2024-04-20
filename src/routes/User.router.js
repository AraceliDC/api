const express = require('express');
const router = express.Router();
const { getAllUsers, singUp, logIn, updateUser, deleteUser } = require('../controllers/User.controller');
const auth = require('../middlewares/auth')

router.get('/', auth, getAllUsers);
router.post('/singUp', singUp);
router.post('/login', logIn);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router