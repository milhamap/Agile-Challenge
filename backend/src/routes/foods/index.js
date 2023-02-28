const express = require('express');
const { createFood, getsFood, getFood, updateFood, deleteFood, myFood } = require('../../resolvers/foods');
const { verifyToken } = require('../../middlewares')
const router = express.Router();

router.post('/', verifyToken, createFood);
router.get('/', getsFood);
router.get('/me/', verifyToken, myFood);
router.get('/:id', getFood);
router.put('/:id',verifyToken, updateFood);
router.delete('/:id',verifyToken, deleteFood);

module.exports = router;