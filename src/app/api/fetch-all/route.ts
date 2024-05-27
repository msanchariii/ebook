import { response } from "@/helpers/ApiRespone";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book.model";
import Magazine from "@/models/Magazine.model";

// /api/fetch-all?type=book
// /api/fetch-all?type=mag

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url); // getting queries
        const type = searchParams.get("type");

        if (!type) {
            return response({
                status: 404,
                success: false,
                message: "Product type is required",
            });
        }

        if (type !== "book" && type !== "mag") {
            return response({
                status: 404,
                success: false,
                message: "Invalid product type.",
            });
        }

        await dbConnect();
        let items;
        if (type === "book") {
            items = await Book.find();
        } else if (type === "mag") {
            items = await Magazine.find();
        }
        // console.log(books);

        return response({
            status: 200,
            success: true,
            message: "Fetched all ptoducts.",
            data: items,
        });
    } catch (error) {
        return response({
            status: 500,
            success: false,
            message: "Error fetching books.",
        });
    }
}
