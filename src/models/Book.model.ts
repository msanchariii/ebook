import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number, // in rupees
    },
    fileLocation: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    isbn: {
        type: String,
    },
    paymentLink: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);
export default Book;
