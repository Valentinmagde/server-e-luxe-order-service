import mongoose from 'mongoose';

const shippingMethodSchema = new mongoose.Schema(
    {
      name: {type: String, required: true},
      slug: {type: String, required: true},
      description: {type: String, required: false},
      minimum_amount: {type: Number, required: false}
    },
    {
      timestamps: {
        createdAt: "created_at", // Use `created_at` to store the created date
        updatedAt: "updated_at", // and `updated_at` to store the updated date
      },
    }
);

const ShippingMethod = mongoose.model('shipping_method', shippingMethodSchema);

export default ShippingMethod;