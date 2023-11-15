import mongoose, { model, Schema, models } from "mongoose";

const VariationSchema = new Schema({
  name: { type: String, required: true },
  values: [{ type: String, required: true }],
});

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    variations: [VariationSchema],
  },
  {
    timestamps: true,
  }
);

export const Product = models.Product || model("Product", ProductSchema);
