import BookCard from "@/components/Book/BookCard";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

async function page() {
    cookies();
    const response = await fetch(
        `${process.env.BASE_URL}/api/fetch-all?type=book`,
        {
            cache: "no-store",
        },
    );
    const responseData = await response.json();
    const { userId } = auth();

    let books;
    if (responseData.success) {
        books = responseData.data;
    }
    return (
        <div className="p-6">
            <h1 className="my-6 text-center text-4xl font-semibold">Books</h1>
            <div className="mx-auto grid grid-cols-2 content-center md:grid-cols-3 lg:grid-cols-5">
                {books &&
                    books.length > 0 &&
                    books.map((book: any) => {
                        // console.log(book);
                        // console.log(book.coverImage);
                        return (
                            <>
                                <BookCard
                                    key={book._id}
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    type="book"
                                    // paymentLink={book.paymentLink}
                                ></BookCard>
                                <BookCard
                                    key={book._id}
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    type="book"
                                    // paymentLink={book.paymentLink}
                                ></BookCard>
                                <BookCard
                                    key={book._id}
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    type="book"
                                    // paymentLink={book.paymentLink}
                                ></BookCard>
                                <BookCard
                                    key={book._id}
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    type="book"
                                    // paymentLink={book.paymentLink}
                                ></BookCard>
                            </>
                        );
                    })}
            </div>
        </div>
    );
}

export default page;
