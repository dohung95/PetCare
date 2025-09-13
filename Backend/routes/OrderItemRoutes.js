const express = require('express');
const { getOrderItems, getOrderItemById, createOrderItem, updateOrderItem, deleteOrderItem } = require('../controllers/OrderItemController');
const router = express.Router();

router.route('/').get(getOrderItems).post(createOrderItem);
router.route('/:id').get(getOrderItemById).put(updateOrderItem).delete(deleteOrderItem);

module.exports = router;