import ReadBook from "@/components/Book/ReadBook";
import PdfViewer from "@/components/PdfViewer/PdfViewer";
import { auth } from "@clerk/nextjs/server";
import React from "react";

// URL: /read?type={}&itemId={}

async function page({
    searchParams,
}: {
    searchParams: { type: string; itemId: string };
}) {
    const type = searchParams.type;
    const itemId = searchParams.itemId;

    const { userId } = auth();
    if (!userId) {
        return <h1>User Must be Authenticated.</h1>;
    }
    if (!itemId) {
        return <h1>Book Id is required.</h1>;
    }
    if (!type) {
        return <h1>Product Type is required.</h1>;
    }
    const encodedUserId = encodeURIComponent(userId);
    const encodedItemId = encodeURIComponent(itemId);

    const url = `${process.env.BASE_URL}/api/check-access?type=${type}&userId=${encodedUserId}&id=${encodedItemId}`;
    try {
        const response = await fetch(url);
        const responseData = await response.json();

        const file = responseData.success
            ? responseData.data.fileLocation
            : null;

        // return <div>{file && <ReadBook file={file} />}</div>;
        const pdfUrl = "/sample.pdf";
        return (
            <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 p-4">
                <PdfViewer pdfUrl={file} />
            </div>
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error fetching data</div>;
    }
}

export default page;
