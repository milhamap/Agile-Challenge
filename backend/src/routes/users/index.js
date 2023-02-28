const express = require('express');
const { register, login, logout, refreshToken } = require('../../resolvers/users');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);
router.get('/refresh-token', refreshToken);

module.exports = router;