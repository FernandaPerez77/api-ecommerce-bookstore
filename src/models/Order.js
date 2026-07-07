const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(

    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        books: [

            {

                book: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Book',
                    required: true
                },

                quantity: {
                    type: Number,
                    default: 1
                }

            }

        ],

        total: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                'Pending',
                'Paid',
                'Cancelled'
            ],
            default: 'Pending'
        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model('Order', orderSchema);