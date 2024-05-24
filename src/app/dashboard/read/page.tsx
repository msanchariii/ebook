import ReadBook from "@/components/Book/ReadBook";
import React from "react";

// {title, author, description, price fileLocation, coverImage. isbn, createdAt}
interface BookInterface {
    title: string;
    author: string;
    filelocation: string;
}

function page() {
    return (
        <div>
            <div>No Book to Fetch</div>
        </div>
    );
}

export default page;
