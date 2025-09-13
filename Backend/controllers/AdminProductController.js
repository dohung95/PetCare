const Product = require("../models/Product");

// Lấy danh sách sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo sản phẩm mới (có thể kèm ảnh)
exports.createProduct = async (req, res) => {
  try {
    console.log("req.body:", req.body);   // 👈 check text
    console.log("req.file:", req.file);   // 👈 check file

    const data = {
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price),
      description: req.body.description,
      stock_quantity: Number(req.body.stock_quantity),
      image: req.file ? `/uploads/${req.file.filename}` : null
    };

    const newProduct = new Product(data);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).json({ message: err.message });
  }
};



// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const { name, category, price, stock_quantity, description } = req.body;

    const updateData = {
      name,
      category,
      price,
      stock_quantity,
      description,
    };

    // Nếu có upload ảnh mới
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(400).json({ message: err.message });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: err.message });
  }
};
