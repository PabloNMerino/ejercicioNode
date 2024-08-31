import { Schema, model, Types } from "mongoose"

const cartSchema = new Schema({
    user_id: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product_id: {
                type: Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        }
    ],
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

const ShoppingCart = model("Shopping_Cart", cartSchema);

export default ShoppingCart;