import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book.model";
import Magazine from "@/models/Magazine.model";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// URL: /item?type=book&id=XYZ
// URL: /item?type=mag&id=XYZ
async function page({
    searchParams,
}: {
    searchParams: { type: string; id: string };
}) {
    const type = searchParams.type;
    const id = searchParams.id;
    let item;
    let paymentURL;
    let user;
    try {
        await dbConnect();
        if (type === "book") {
            item = await Book.findById(id);
        }
        if (type === "mag") {
            item = await Magazine.findById(id);
        }

        if (item.paymentLink) {
            paymentURL = item.paymentLink;
        } else {
            const { userId } = auth();
            paymentURL = `/checkout?amount=${item.price}&bookId=${item.bookId}&userId=${userId}`;
        }
    } catch (error) {}
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.toLocaleString("default", { month: "long" });
        return `${month} ${year}`;
    };

    return (
        <div className="w-full p-6">
            {item && (
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/2">
                        <Image
                            src={item.coverImage}
                            height={200}
                            width={300}
                            alt={`${item.name} cover image`}
                            className="mx-auto"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 p-8">
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        <p>{formatDate(item.createdAt)}</p>
                        <Button>
                            <Link href={paymentURL}>Buy</Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default page;
