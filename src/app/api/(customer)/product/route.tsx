import { response } from "@/helpers/ApiRespone";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book.model";
import Magazine from "@/models/Magazine.model";

// /api/product?type=book&id={ }
// /api/product?type=mag&id{ }

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url); // getting queries
        const type = searchParams.get("type");
        const itemId = searchParams.get("id");

        if (!type || !itemId) {
            return response({
                status: 404,
                success: false,
                message: "Product type & ID is required",
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
        let item;
        if (type === "book") {
            item = await Book.findById(itemId);
        } else if (type === "mag") {
            item = await Magazine.findById(itemId);
        }
        // console.log(books);

        return response({
            status: 200,
            success: true,
            message: "Fetched all ptoducts.",
            data: item,
        });
    } catch (error) {
        return response({
            status: 500,
            success: false,
            message: "Error fetching books.",
        });
    }
}
