// controllers/OrderController.js
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const { owner_id, items } = req.body;

    if (!owner_id || !items || items.length === 0) {
      return res.status(400).json({ message: "Thiếu owner_id hoặc items" });
    }

    // Tính tổng tiền
    let totalAmount = 0;

    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product_id);
        if (!product) throw new Error("Sản phẩm không tồn tại");

        if (product.stock_quantity < item.quantity) {
          throw new Error(`Sản phẩm ${product.name} không đủ số lượng`);
        }

        // Trừ stock
        product.stock_quantity -= item.quantity;
        await product.save();

        const priceEach = item.price_each || product.price;
        totalAmount += priceEach * item.quantity;

        return {
          product_id: product._id,
          quantity: item.quantity,
          price_each: priceEach,
        };
      })
    );

    // Tạo đơn hàng
    const order = new Order({
      owner_id,
      items: orderItems,
      total_amount: totalAmount,
    });

    await order.save();

    res.status(201).json({
      message: "Order placed successfully!",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Failed to place order!", error);
    res.status(500).json({ message: "Server error", error });
  }
};
