import BookCard from "@/components/Book/BookCard";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import React from "react";

async function page() {
    cookies();
    const response = await fetch(
        `${process.env.BASE_URL}/api/fetch-all?type=mag`,
        {
            cache: "no-store",
        },
    );
    const responseData = await response.json();
    const { userId } = auth();

    let mags;
    if (responseData.success) {
        mags = responseData.data;
    }
    return (
        <div className="p-4">
            <h1 className="text-center text-4xl font-semibold"> Magazines </h1>
            <div className="mx-auto grid grid-cols-2 content-center md:grid-cols-3 lg:grid-cols-5">
                <div className="col-span-full hidden w-full bg-red-200 p-12 md:block">
                    Hey
                </div>
                {mags &&
                    mags.length > 0 &&
                    mags.map((book: any) => {
                        return (
                            <>
                                <BookCard
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    // paymentLink={book.paymentLink}
                                    type="mag"
                                    createdAt={book.createdAt}
                                ></BookCard>
                                <BookCard
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    // paymentLink={book.paymentLink}
                                    type="mag"
                                    createdAt={book.createdAt}
                                ></BookCard>
                                <BookCard
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    // paymentLink={book.paymentLink}
                                    type="mag"
                                    createdAt={book.createdAt}
                                ></BookCard>
                                <BookCard
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    // paymentLink={book.paymentLink}
                                    type="mag"
                                    createdAt={book.createdAt}
                                ></BookCard>
                                <BookCard
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    // paymentLink={book.paymentLink}
                                    type="mag"
                                    createdAt={book.createdAt}
                                ></BookCard>
                                <BookCard
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    // paymentLink={book.paymentLink}
                                    type="mag"
                                    createdAt={book.createdAt}
                                ></BookCard>
                                <BookCard
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    // paymentLink={book.paymentLink}
                                    type="mag"
                                    createdAt={book.createdAt}
                                ></BookCard>
                                <BookCard
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    // paymentLink={book.paymentLink}
                                    type="mag"
                                    createdAt={book.createdAt}
                                ></BookCard>
                                <BookCard
                                    bookId={book._id}
                                    userId={userId}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    coverImage={book.coverImage}
                                    description={book.description}
                                    // paymentLink={book.paymentLink}
                                    type="mag"
                                    createdAt={book.createdAt}
                                ></BookCard>
                            </>
                        );
                    })}
            </div>
        </div>
    );
}
export default page;
