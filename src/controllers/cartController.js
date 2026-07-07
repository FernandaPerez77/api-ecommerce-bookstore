const Cart = require('../models/Cart');

// Get all carts
exports.getCarts = async (req, res) => {
    try {
        const carts = await Cart.find().populate('user').populate('books.book');
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get cart by ID
exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
            .populate('user')
            .populate('books.book');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create cart
exports.createCart = async (req, res) => {
    try {
        const cart = new Cart(req.body);
        const savedCart = await cart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update cart
exports.updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json(updatedCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete cart
exports.deleteCart = async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);

        if (!deletedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};