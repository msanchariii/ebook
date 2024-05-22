import mongoose from "mongoose";

const { Schema } = mongoose;

const MagazineSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    edition: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Magazine =
    mongoose.models.Magazine || mongoose.model("Magazine", MagazineSchema);
export default Magazine;
