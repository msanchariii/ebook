import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);
export default Book;
