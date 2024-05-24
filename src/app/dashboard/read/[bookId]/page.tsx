import ReadBook from "@/components/Book/ReadBook";
import { auth } from "@clerk/nextjs/server";
import React from "react";

async function page({ params }: { params: { bookId: string } }) {
    const bookId = params.bookId;
    const { userId } = auth();
    if (!userId) {
        return <>User ID is required.</>;
    }
    const encodedUserId = encodeURIComponent(userId);
    const encodedBookId = encodeURIComponent(bookId);
    const url = `${process.env.BASE_URL}/api/check-access?userId=${encodedUserId}&bookId=${encodedBookId}`;
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        console.log(responseData);

        const file = responseData.success
            ? responseData.data.fileLocation
            : null;

        return <div>{file && <ReadBook file={file} />}</div>;
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error fetching data</div>;
    }
}

export default page;
