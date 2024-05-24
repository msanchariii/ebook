import ReadBook from "@/components/Book/ReadBook";
import React from "react";

// {title, author, description, price fileLocation, coverImage. isbn, createdAt}
interface BookInterface {
    title: string;
    author: string;
    filelocation: string;
}

function page() {
    const file = `https://cdn.jsdelivr.net/gh/msanchariii/pdfs@master/JennaRainey.pdf`;
    return (
        <div>
            <ReadBook file={file} />
        </div>
    );
}

export default page;
