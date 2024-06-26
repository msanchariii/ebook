import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    mags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Magazine" }],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
