// controllers/productController.js
const  Product  = require('../models/product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = await Product.create({ name, description, price });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw new Error('Product not found');
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const [updatedRows] = await Product.update(
      { name, description, price },
      { where: { id: req.params.id } }
    );
    if (updatedRows === 0) throw new Error('Product not found');
    const updatedProduct = await Product.findByPk(req.params.id);
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedRowCount = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deletedRowCount === 0) throw new Error('Product not found');
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
