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
        }
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
            <div>
                {mags &&
                    mags.length > 0 &&
                    mags.map((book: any) => {
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
                                    // paymentLink={book.paymentLink}
                                    type="mag"
                                    createdAt={book.createdAt}
                                ></BookCard>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
export default page;
