import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function MagCard(book: any) {
    const { title, price, coverImage, createdAt } = book;
    return (
        <div>
            <div>
                <Image src={coverImage} fill alt={title} />
            </div>
            <div>
                <h2>{title}</h2>
                <p>{price}</p>
                <p>{createdAt}</p>
            </div>
            <div>
                <Button>View</Button>
                <Button>Buy</Button>
            </div>
        </div>
    );
}
