import { Schema, model, Types } from "mongoose"


const addressSchema = new Schema({
    street_name: {
        type: String,
        required: true,
        },
    street_number: {
        type: Number,
        required: true,
        },
    postal_code: {
        type: String,
        required: true,
        },
    city: {
        type: String,
        required: true,
        },
    state: {
        type: String,
        required: true,
    },
    extra_details: {
        type: String,
        required: true,
    },
    user_id: {
        type: Types.ObjectId,
        ref: "User"
    },
})

    const Address = model("Addresses", addressSchema);

    export default Address;