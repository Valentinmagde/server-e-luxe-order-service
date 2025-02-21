import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    order_items: [
      {
        title: { type: Object, required: true },
        qty: { type: Number, required: true },
        image: { type: [String], required: false },
        price: { type: Number, required: true },
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      },
    ],
    shipping_address: {
      full_name: { type: String, required: true },
      company: { type: String, required: false },
      state: { type: String, required: false },
      address: { type: Object, required: true },
      city: { type: String, required: true },
      postal_code: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
    },
    payment_method: { type: String, required: true },
    payment_description: { type: String, required: true },
    payment_result: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    items_price: { type: Number, required: true },
    shipping_method: { type: String, required: true },
    shipping_price: { type: Number, required: false },
    tax_price: { type: Number, required: false },
    total_price: { type: Number, required: true },
    delivery_note: { type: String, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, required: false },
    order_number: { type: Number, required: false },
    is_paid: { type: Boolean, default: false },
    paid_at: { type: Date },
    is_delivered: { type: Boolean, default: false },
    discount: { type: Number, required: true, default: 0 },
    shipping_option: { type: String, required: false },
    card_info: { type: Object, required: false },
    invoice: { type: String, required: false },
    cart: [{}],
    user_info: {
      name: { type: String, required: false },
      email: { type: String, required: false },
      contact: { type: String, required: false },
      address: { type: String, required: false },
      city: { type: String, required: false },
      country: { type: String, required: false },
      zipCode: { type: String, required: false },
    },
    sub_total: { type: Number, required: true },
    shipping_cost: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Processing", "Delivered", "Cancel"],
    },
    delivered_at: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the updated date
    },
  }
);

const Order = mongoose.model("order", orderSchema);

export default Order;
