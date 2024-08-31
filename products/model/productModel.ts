import { Schema, model, Types } from "mongoose"

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updated_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
})

const Product = model("Products", productSchema);

export default Product;