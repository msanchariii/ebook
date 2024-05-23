import Image from "next/image";
import React from "react";

function MagPage(mag: any) {
    const { title, description, price, coverImage, issn, createdAt } = mag;
    return (
        <div>
            <div>
                <Image src={coverImage} fill alt={title} />
            </div>
            <div>
                <p>Title: {title}</p>
                <p>Description: {description}</p>
                <p>Price: {price}</p>
                <p>ISSN: {issn}</p>
                <p>Date: {createdAt}</p>
            </div>
        </div>
    );
}

export default MagPage;
