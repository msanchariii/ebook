import { response } from "@/helpers/ApiRespone";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book.model";
import Magazine from "@/models/Magazine.model";
import User from "@/models/User.model";

// URL : /api/check-access?type=${type}&id=${id}&userId={userId}
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        // getting queries
        const userId = searchParams.get("userId");
        const type = searchParams.get("type");
        const itemId = searchParams.get("id");

        // url validation
        if (!userId || !itemId || !type) {
            return response({
                success: false,
                status: 400,
                message: "User ID, Product ID and Product type is required",
            });
        }
        // correct type or not
        if (type !== "book" && type !== "mag") {
            return response({
                success: false,
                status: 400,
                message: "Invalid product type.",
            });
        }

        const clerkId = decodeURIComponent(userId);

        await dbConnect();

        let user = await User.findOne({ clerkId });

        if (!user) {
            return response({
                success: false,
                status: 404, // Not Found
                message: "User not found in Database.",
            });
        }
        let item;
        if (type === "book") {
            item = await Book.findById(itemId);
        } else if (type === "mag") {
            item = await Magazine.findById(itemId);
        }
        // check if the product exists in database
        if (!item) {
            return response({
                success: false,
                status: 404,
                message: "Product not found.",
            });
        }

        if (type === "book") {
            if (user.books.includes(itemId)) {
                return response({
                    success: true,
                    status: 200,
                    message: "User has access to book.",
                    data: {
                        fileLocation: item.fileLocation,
                    },
                });
            }
        } else if (type === "mag") {
            if (user.mags.includes(itemId)) {
                return response({
                    success: true,
                    status: 200,
                    message: "User has access to Magazine.",
                    data: {
                        fileLocation: item.fileLocation,
                    },
                });
            }
        }
        // item is not added, return error
        return response({
            success: false,
            status: 403, // Forbidden
            message: "User does not have access to the book",
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
