import { response } from "@/helpers/ApiRespone";
import dbConnect from "@/lib/dbConnect";
import Magazine from "@/models/Magazine.model";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const mags = await Magazine.find();
        return response({
            status: 200,
            success: true,
            message: "Fetched all books.",
            data: mags,
        });
    } catch (error) {
        return response({
            status: 500,
            success: false,
            message: "Error fetching books.",
        });
    }
}
