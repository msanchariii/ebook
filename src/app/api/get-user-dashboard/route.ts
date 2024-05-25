import { response } from "@/helpers/ApiRespone";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";

// URL : /api/get-user-dashboard?userId=
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url); // getting queries
        const userID = searchParams.get("userId");
        const userEmail = searchParams.get("userEmail");
        if (!userID) {
            return response({
                success: false,
                status: 400,
                message: "User ID is required",
            });
        }
        const clerkId = decodeURIComponent(userID);

        await dbConnect();

        let user = await User.findOne({ clerkId });

        if (!user) {
            // user doesn't exist in DB. We need to create one.
            user = new User({
                clerkId,
                email: userEmail,
                books: [],
                mags: [],
            });
            await user.save();

            return response({
                success: true,
                status: 201, // 201 Created
                message: "New User Created in DB",
                data: user,
            });
        } else {
            // User exists. We will fetch all the books.
            return response({
                success: true,
                status: 200,
                message: "User found in DB. Books returned",
                data: { books: user.books },
            });
        }
    } catch (error: any) {
        const msg = error.message;
        return response({
            success: false,
            status: 500,
            message: `Internal Server Error: ${msg}`,
        });
    }
}
