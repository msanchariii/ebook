import ReadBook from "@/components/Book/ReadBook";
import React from "react";

function page() {
    const file = `https://cdn.jsdelivr.net/gh/msanchariii/pdfs@master/JennaRainey.pdf`;
    return (
        <div>
            <ReadBook file={file} />
        </div>
    );
}

export default page;
