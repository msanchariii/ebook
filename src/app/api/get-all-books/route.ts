import { response } from "@/helpers/ApiRespone";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book.model";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const books = await Book.find();
        // console.log(books);

        return response({
            status: 200,
            success: true,
            message: "Fetched all books.",
            data: books,
        });
    } catch (error) {
        return response({
            status: 500,
            success: false,
            message: "Error fetching books.",
        });
    }
}
