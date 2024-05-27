import { response } from "@/helpers/ApiRespone";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";

// URL : /api/add-to-dashboard?userId={ }&type={ }&id={}
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url); // getting queries
        const userID = searchParams.get("userId");
        const itemId = searchParams.get("id");
        const type = searchParams.get("type");

        if (!userID || !itemId || !type) {
            return response({
                success: false,
                status: 400,
                message: "User ID, Product Type & Product ID is required",
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
        if (type === "book") {
            user.books.push(itemId);
        } else if (type === "mag") {
            user.mags.push(itemId);
        } else {
            return response({
                success: false,
                status: 500,
                message: "Invalid Product Type",
            });
        }

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
