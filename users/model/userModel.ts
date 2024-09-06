import { Schema, model } from "mongoose"
import { UserRole } from "./userRoleEnum"
import bcrypt from "bcrypt";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        },
    last_name: {
        type: String,
        required: true,
        },
    email: {
        type: String,
        required: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
            ],
        unique: true,
        },
    password: {
        type: String,
        required: true,
        },
    phone: {
        type: String,
        required: true,
        match: [
            /^\+?[1-9]\d{1,14}$/,
            "Please fill a valid phone number",
         ],
        unique: true,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.Customer
    },
    is_enabled: {
        type: Boolean,
        default: true,          
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
})

userSchema.pre("save", async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password ?? "", 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.error(error);
    }
});

    const User = model("Users", userSchema);

    export default User;