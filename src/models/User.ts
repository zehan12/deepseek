import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    image?: string;
}

const userSchema = new Schema<IUser>(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: (email: string) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email),
                message: "Invalid email format",
            },
        },
        image: { type: String },
    },
    { timestamps: true }
)

export const User = mongoose.models.User || mongoose.model("User", userSchema);