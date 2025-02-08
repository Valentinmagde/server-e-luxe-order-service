import mongoose from 'mongoose';

const shippingPrice = new mongoose.Schema(
    {
        departure: {type: mongoose.Schema.Types.ObjectId, required: true},
        arrival: {type: mongoose.Schema.Types.ObjectId, required: true},
        price: {type: Number, required: true},
        tax: {type: Number, required: true}
    },
    {
      timestamps: {
        createdAt: "created_at", // Use `created_at` to store the created date
        updatedAt: "updated_at", // and `updated_at` to store the updated date
      }
    }
);

const ShippingPrice = mongoose.model('shipping_price', shippingPrice);

export default ShippingPrice;