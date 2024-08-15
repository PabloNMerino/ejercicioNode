import { Schema, model } from "mongoose"
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
    username: {
        type: String,
        required: true,
        unique: true,
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
    is_admin: {
        type: Boolean,
        default: false,
        },
    is_enabled: {
        type: Boolean,
        default: true,
        set: function (value: boolean): boolean {
            return value;
        }
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

    const User = model("User", userSchema);

    export default User;