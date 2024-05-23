import React from "react";
import BookCard from "@/components/Book/BookCard";

function page() {
    const book = {
        title: "Turtles All the Way Down",
        author: "John Green",
        price: 299,
        coverImage: `/sample.jpg`,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid magnam numquam obcaecati iste, deleniti cum optio illo temporibus accusantium accusamus?`,
        createdAt: `22 Jan`,
        paymentButtonId: `pl_ODuonTcC9PyxQU`,
    };
    return (
        <div>
            <BookCard
                title={book.title}
                author={book.author}
                price={book.price}
                coverImage={book.coverImage}
                description={book.description}
                paymentButtonId={book.paymentButtonId}
            />
        </div>
    );
}

export default page;
