const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(200).json({success: true, data: Orders});

  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const Order = await Order.findById(req.params.id);
    if (!Order){
      return res.status(404).json({success: true, data: Order})
    }
  } catch (error) {
    res.status(500).json({success: false, message: error.message}); 
  }
};

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Owner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Owner.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Owner not found' });
    }
    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};