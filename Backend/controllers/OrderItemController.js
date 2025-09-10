const OrderItem = require('../models/OrderItem');

exports.getOrderItems = async (req, res) => {
  try {
    const OrderItems = await OrderItem.find();
    res.status(200).json({success: true, data: OrderItems});

  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

exports.getOrderItemById = async (req, res) => {
  try {
    const OrderItem = await OrderItem.findById(req.params.id);
    if (!OrderItem){
      return res.status(404).json({success: true, data: OrderItem})
    }
  } catch (error) {
    res.status(500).json({success: false, message: error.message}); 
  }
};

exports.createOrderItem = async (req, res) => {
  try {
    const newOrderItem = await OrderItem.create(req.body);
    res.status(201).json({ success: true, data: newOrderItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateOrderItem = async (req, res) => {
  try {
    const updatedOrderItem = await Owner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedOrderItem) {
      return res.status(404).json({ success: false, message: 'OrderItem not found' });
    }
    res.status(200).json({ success: true, data: updatedOrderItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const deletedOrderItem = await Owner.findByIdAndDelete(req.params.id);
    if (!deletedOrderItem) {
      return res.status(404).json({ success: false, message: 'Owner not found' });
    }
    res.status(200).json({ success: true, message: 'OrderItem deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};