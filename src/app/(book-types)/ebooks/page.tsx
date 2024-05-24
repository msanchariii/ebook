import { Button } from "@/components/ui/button";
import React from "react";

async function page() {
    const response = await fetch(`${process.env.BASE_URL}/api/get-all-books`);
    const responseData = await response.json();
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
                    books.map((book: any) => (
                        <div
                            key={book._id}
                            className="bg-yellow-200 w-1/3 p-4 rounded-lg flex flex-col gap-y-2"
                        >
                            <h1 className="font-bold">{book.title}</h1>
                            <p>{book.description}</p>
                            <Button className="w-20">Buy</Button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default page;
