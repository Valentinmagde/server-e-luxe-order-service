import mongoose from "mongoose";

const orderCounterSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    sequence_value: { type: Number, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the updated date
    },
  }
);

const OrderCounter = mongoose.model("order_counter", orderCounterSchema);

export default OrderCounter;
