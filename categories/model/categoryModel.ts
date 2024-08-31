import { Schema, model } from "mongoose"

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        },
    description: {
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

const Category = model("Categories", categorySchema);

export default Category;