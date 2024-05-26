import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cookies } from "next/headers";

async function page() {
    let books, mags;
    cookies();
    const bookResponse = await fetch(
        `${process.env.BASE_URL}/api/get-all-books`
    );
    const magResponse = await fetch(`${process.env.BASE_URL}/api/get-all-mags`);
    const bookResponseData = await bookResponse.json();
    const magResponseData = await magResponse.json();
    if (bookResponseData.success && magResponseData.success) {
        books = bookResponseData.data;
        mags = magResponseData.data;
    }

    return (
        <div>
            <div>
                <div className="flex justify-between my-4">
                    <h1 className="text-2xl font-bold">Books</h1>
                    <Button>
                        <Link href={`/admin/add-book`}>Add New Book</Link>
                    </Button>
                </div>
                <Separator />
                <div className="my-8 lg:w-2/3">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {/* <TableHead className="bg-yellow-100 text-black">
                                    Book ID
                                </TableHead> */}
                                <TableHead>Title</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">
                                    Author
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {books?.map((book: any) => (
                                <TableRow key={book._id}>
                                    {/* <TableCell className="font-semibold bg-yellow-50">
                                        {book._id}
                                    </TableCell> */}
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.price}</TableCell>
                                    <TableCell className="text-right">
                                        {book.author}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Separator />
            </div>
            <div>
                <div className="flex justify-between my-4">
                    <h1 className="text-2xl font-bold">Magazines</h1>
                    <Button>
                        <Link href={`/admin/add-magazine`}>
                            Add New Magazine
                        </Link>
                    </Button>
                </div>
                <Separator />
                <div className="my-8 lg:w-2/3">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {/* <TableHead className="bg-yellow-100 text-black">
                                    Magazine ID
                                </TableHead> */}
                                <TableHead>Title</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mags?.map((book: any) => (
                                <TableRow key={book._id}>
                                    {/* <TableCell className="font-semibold bg-yellow-50">
                                        {book._id}
                                    </TableCell> */}
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Separator />
            </div>
        </div>
    );
}

export default page;
