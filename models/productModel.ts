import { Schema, model } from "mongoose"

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
    amount_available: {
        type: Number,
        required: true,
    }
})

const Product = model("Products", productSchema);

export default Product;