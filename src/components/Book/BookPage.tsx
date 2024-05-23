import Image from "next/image";
import React from "react";

function MagPage(book: any) {
    const { title, author, description, price, coverImage, createdAt } = book;
    return (
        <div>
            <div>
                <Image src={coverImage} fill alt={title} />
            </div>
            <div>
                <p>Title: {title}</p>
                <p>Author: {author}</p>
                <p>Description: {description}</p>
                <p>Price: {price}</p>
                <p>Date: {createdAt}</p>
            </div>
        </div>
    );
}

export default MagPage;
