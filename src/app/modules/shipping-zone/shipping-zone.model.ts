import mongoose from "mongoose";

const shippingZone = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shippingMethods: [
      { type: mongoose.Schema.Types.ObjectId, ref: "shipping_method" },
    ],
    countries: [
      { type: mongoose.Schema.Types.ObjectId }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the updated date
    },
  }
);

const ShippingZone = mongoose.model("shipping_zone", shippingZone);

export default ShippingZone;