import ReadBook from "@/components/Book/ReadBook";
import { auth } from "@clerk/nextjs/server";
import React from "react";

// URL: /read?bookId=XYZ

async function page({ searchParams }: { searchParams: { bookId: string } }) {
    const bookId = searchParams.bookId;
    const { userId } = auth();
    if (!userId) {
        return <h1>User Must be Authenticated.</h1>;
    }
    if (!bookId) {
        return <h1>Book Id is required.</h1>;
    }
    const encodedUserId = encodeURIComponent(userId);
    const encodedBookId = encodeURIComponent(bookId);
    const url = `${process.env.BASE_URL}/api/check-access?userId=${encodedUserId}&bookId=${encodedBookId}`;
    try {
        const response = await fetch(url, { cache: "no-store" });
        const responseData = await response.json();

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
