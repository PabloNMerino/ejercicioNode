import { Schema, model } from "mongoose"

const checkoutSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    products: {
        type: String,
        required: true,
    },
    total_items: {
        type: Number,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    }
})

const Checkout = model("Checkout", checkoutSchema);

export default Checkout;