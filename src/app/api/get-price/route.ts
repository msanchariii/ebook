import { response } from "@/helpers/ApiRespone";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book.model";
import Magazine from "@/models/Magazine.model";
import User from "@/models/User.model";

// URL : /api/add-user-dashboard?userId=XYZ&bookId=PQR
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url); // getting queries
        const type = searchParams.get("type");
        const itemId = searchParams.get("id");

        if (!type || !itemId) {
            return response({
                success: false,
                status: 400,
                message: "Item ID & Type is required",
            });
        }

        await dbConnect();

        let item;
        if (type === "book") {
            item = await Book.findById(itemId);
        }
        if (type === "mag") {
            item = await Magazine.findById(itemId);
        }

        if (!item) {
            return response({
                success: false,
                status: 404, // 201 Created
                message: "Item not found.",
            });
        }
        return response({
            success: true,
            status: 200,
            message: "Successfully Fetched Price",
            data: {
                price: item.price,
                title: item.title,
            },
        });
    } catch (error: any) {
        const msg = error.message;
        return response({
            success: false,
            status: 500,
            message: `Internal Server Error: ${msg}`,
        });
    }
}
