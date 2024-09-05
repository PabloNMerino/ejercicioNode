import { Schema, model, Types } from "mongoose";
import { PaymentMethod } from "./paymentMethodEnum";
import { PaymentStatus } from "./paymentStatusEnum";

const paymentSchema = new Schema({
    order_id: {
        type: Types.ObjectId,
        ref: "Order",
        required: true,
    },
    user_id: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    payment_method: {
        type: String,
        enum: Object.values(PaymentMethod),
        required: true,
    },
    payment_date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(PaymentStatus),
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

const Payment = model("Payments", paymentSchema);

export default Payment;