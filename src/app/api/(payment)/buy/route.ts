import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import { response } from "@/helpers/ApiRespone";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const paymentEntity = data.payload.payment.entity; // razorpay
        // console.log("Email:", paymentEntity.email);
        const { email, status } = paymentEntity;
        console.log(email); // retrived

        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");
        const itemId = searchParams.get("id");
        console.log("Type:", type, "  Id:", itemId);

        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
            // refund
            return response({
                message: "User not found or wrong email entered.",
                status: 404,
                success: false,
            });
        }
        console.log("User found");
        if (type === "book") {
            user.books.push(itemId);
            await user.save();
            return response({
                message: "Book added to user dashboard.",
                status: 200,
                success: true,
            });
        }
        if (type === "mag") {
            user.mags.push(itemId);
            await user.save();
            return response({
                message: "Magazine added to user dashboard.",
                status: 200,
                success: true,
            });
        }
        return response({
            message: "Type must be of either book or mag.",
            status: 400,
            success: false,
        });
    } catch (error) {
        return response({
            message: "Internal error occured",
            status: 500,
            success: false,
        });
    }
}
