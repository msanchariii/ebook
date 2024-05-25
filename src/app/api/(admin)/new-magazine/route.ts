import dbConnect from "@/lib/dbConnect";
import { response } from "@/helpers/ApiRespone";
import Magazine from "@/models/Magazine.model";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const title = formData.get("title");
        const description = formData.get("description");
        const price = formData.get("price");
        const coverImage = formData.get("coverImage");
        const fileLocation = formData.get("fileLocation");
        const issn = formData.get("issn");
        const paymentLink = formData.get("paymentLink");

        await dbConnect();

        // Validation (if necessary)
        if (!title || !description || !price || !coverImage || !fileLocation) {
            return response({
                status: 400,
                success: false,
                message:
                    "Title, description, price, cover image, and file location are required.",
            });
        }
        const priceInNumber = Number(price);
        const newMagazine = new Magazine({
            title,
            description,
            price: priceInNumber,
            coverImage,
            fileLocation,
            issn,
            paymentLink,
        });

        await newMagazine.save();

        return response({
            status: 201,
            success: true,
            message: "Magazine added successfully.",
            data: newMagazine,
        });
    } catch (error: any) {
        return response({
            status: 500,
            success: false,
            message: `Error adding magazine:: ${error}`,
        });
    }
}
