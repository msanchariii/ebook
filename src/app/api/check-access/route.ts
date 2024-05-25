import { response } from "@/helpers/ApiRespone";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book.model";
import User from "@/models/User.model";
import { auth } from "@clerk/nextjs/server";

// URL : /api/check-access?userId=XYZ&bookId=PQR
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        // getting queries
        // const { userId } = auth();
        const userId = searchParams.get("userId");
        const bookId = searchParams.get("bookId");
        // console.log("User Id:", userId, "Book Id:", bookId);

        if (!userId || !bookId) {
            return response({
                success: false,
                status: 400,
                message: "User ID & Book ID is required",
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

        // Check if the book is already added to the user's dashboard
        if (user.books.includes(bookId)) {
            // Book is already added, fetch the book details and return the fileLocation
            const book = await Book.findById(bookId);
            if (!book) {
                return response({
                    success: false,
                    status: 404,
                    message: "Book not found in Database.",
                });
            }

            return response({
                success: true,
                status: 200,
                message: "User has access to the book",
                data: {
                    fileLocation: book.fileLocation,
                },
            });
        }

        // Book is not added, return error
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
