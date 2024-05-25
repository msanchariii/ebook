import dbConnect from "@/lib/dbConnect";
import { response } from "@/helpers/ApiRespone";
import Book from "@/models/Book.model";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const title = formData.get("title");
        const author = formData.get("author");
        const description = formData.get("description");
        const price = formData.get("price");
        const coverImage = formData.get("coverImage");
        const fileLocation = formData.get("fileLocation");
        const isbn = formData.get("isbn");
        const paymentLink = formData.get("paymentLink");

        await dbConnect();

        // Validation (if necessary)
        if (!title || !description || !price || !coverImage || !fileLocation) {
            return response({
                status: 400,
                success: false,
                message:
                    "Title, description, price, cover image, and file location are required.",
            });
        }
        const priceInNumber = Number(price);
        const newBook = new Book({
            title,
            author,
            description,
            price: priceInNumber,
            coverImage,
            fileLocation,
            isbn,
            paymentLink,
        });

        await newBook.save();

        return response({
            status: 201,
            success: true,
            message: "Magazine added successfully.",
            data: newBook,
        });
    } catch (error: any) {
        return response({
            status: 500,
            success: false,
            message: `Error adding magazine:: ${error}`,
        });
    }
}
