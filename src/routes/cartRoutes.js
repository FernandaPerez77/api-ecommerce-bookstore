const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Shopping cart management
 */

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Get all carts
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: List of carts
 */
router.get('/', cartController.getCarts);

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     summary: Get cart by ID
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Cart ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart found
 */
router.get('/:id', cartController.getCartById);

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Create cart
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               books:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     book:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Cart created
 */
router.post('/', cartController.createCart);

/**
 * @swagger
 * /api/carts/{id}:
 *   put:
 *     summary: Update cart
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Cart updated
 */
router.put('/:id', cartController.updateCart);

/**
 * @swagger
 * /api/carts/{id}:
 *   delete:
 *     summary: Delete cart
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart deleted
 */
router.delete('/:id', cartController.deleteCart);

module.exports = router;