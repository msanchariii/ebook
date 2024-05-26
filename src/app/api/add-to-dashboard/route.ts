import { response } from "@/helpers/ApiRespone";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";

// URL : /api/add-user-dashboard?userId=XYZ&bookId=PQR
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url); // getting queries
        const userID = searchParams.get("userId");
        const bookId = searchParams.get("bookId");
        const type = searchParams.get("type");

        if (!userID || !bookId) {
            return response({
                success: false,
                status: 400,
                message: "User ID & Book ID is required",
            });
        }
        const clerkId = decodeURIComponent(userID);

        await dbConnect();

        let user = await User.findOne({ clerkId });

        if (!user) {
            // or we can create new user
            return response({
                success: false,
                status: 404, // 201 Created
                message: "User not found in Database.",
            });
        }
        // User exists. We will fetch all the books.

        user.books.push(bookId);
        await user.save();
        return response({
            success: true,
            status: 200,
            message: "Successfully Added Book",
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
