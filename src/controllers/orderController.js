const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Book = require('../models/Book');

// Get all orders
exports.getOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate('user')
            .populate('books.book');

        res.json(orders);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};

// Get order by ID
exports.getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate('user')
            .populate('books.book');

        if (!order) {

            return res.status(404).json({
                message: 'Order not found'
            });

        }

        res.json(order);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};

// Create order
exports.createOrder = async (req, res) => {

    try {

        const order = new Order(req.body);

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

};

// Update order
exports.updateOrder = async (req, res) => {

    try {

        const updatedOrder = await Order.findByIdAndUpdate(

            req.params.id,
            req.body,
            { new: true }

        );

        if (!updatedOrder) {

            return res.status(404).json({
                message: 'Order not found'
            });

        }

        res.json(updatedOrder);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

};

// Delete order
exports.deleteOrder = async (req, res) => {

    try {

        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {

            return res.status(404).json({
                message: 'Order not found'
            });

        }

        res.json({
            message: 'Order deleted successfully'
        });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};

// Checkout
exports.checkout = async (req, res) => {

    try {

        const cart = await Cart.findById(req.params.id)
            .populate('books.book');

        if (!cart) {

            return res.status(404).json({
                message: 'Cart not found'
            });

        }

        let total = 0;

        for (const item of cart.books) {

            total += item.book.price * item.quantity;

            item.book.stock -= item.quantity;

            await item.book.save();

        }

        const order = new Order({

            user: cart.user,

            books: cart.books,

            total: total,

            status: 'Paid'

        });

        await order.save();

        await Cart.findByIdAndDelete(cart._id);

        res.status(201).json(order);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Financial Report
exports.financialReport = async (req, res) => {

    try {

        const orders = await Order.find({

            status: 'Paid'

        });

        let totalSales = 0;

        orders.forEach(order => {

            totalSales += order.total;

        });

        res.json({

            totalOrders: orders.length,

            totalSales

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};