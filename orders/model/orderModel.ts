import { Schema, model, Types } from "mongoose"
import { OrderStatus } from "./orderStatus"

const orderSchema = new Schema({
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
            price: {
                type: Number,
                required: true,
                min: 0,
            },
        }
    ],
    total_price: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
})

const Order= model("Orders", orderSchema);

export default Order;
