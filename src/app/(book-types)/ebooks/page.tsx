import BookCard from "@/components/Book/BookCard";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

async function page() {
    const response = await fetch(`${process.env.BASE_URL}/api/get-all-books`, {
        cache: "no-store",
    });
    const responseData = await response.json();
    const { userId } = auth();
    let books;
    if (responseData.success) {
        books = responseData.data;
    }
    return (
        <div className="p-4">
            <h1 className="text-center text-4xl font-semibold">Books</h1>
            <div>
                {books &&
                    books.length > 0 &&
                    books.map((book: any) => {
                        console.log(book);
                        console.log(book.coverImage);

                        return (
                            <div key={book._id} className="">
                                <BookCard
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                ></BookCard>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default page;
