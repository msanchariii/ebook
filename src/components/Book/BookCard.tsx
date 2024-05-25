import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";

interface BookCardProps {
    bookId: string;
    userId?: string | null;
    title: string;
    author?: string; // Optional field
    description: string;
    price: number;
    coverImage: string;
    paymentLink?: string;
    issn?: string; // Optional field
    isbn?: string; // Optional field
    createdAt?: Date; // Optional field
}

export default function BookCard({
    bookId,
    userId,
    title,
    author,
    price,
    coverImage,
    description,
    paymentLink,
    issn,
    isbn,
    createdAt,
}: BookCardProps) {
    let paymentURL;
    if (userId) {
        paymentURL = paymentLink
            ? paymentLink
            : `/checkout?amount=${1}&bookId=${bookId}&userId=${userId}`;
    }

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.toLocaleString("default", { month: "long" });
        return `${month} ${year}`;
    };

    return (
        <div className="bg-slate-100 shadow rounded-lg w-72 p-4 m-4">
            <div className="mx-6">
                <Image src={coverImage} height={250} width={180} alt={title} />
            </div>
            <div className="flex flex-col gap-y-1 my-2 mx-6">
                <h2 className="text-md font-bold">{title}</h2>
                {author && (
                    <p className="font-semibold text-slate-700">{author}</p>
                )}
                <p>Rs. {price} /-</p>
            </div>
            <div>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button className="mx-6"> View </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className="mx-20 my-3 text-2xl">
                                {title}
                            </DrawerTitle>
                            <DrawerDescription className="mx-10 my-2 text-black">
                                <div className="flex flex-col lg:flex-row">
                                    <div className="mr-4">
                                        <Image
                                            className="mx-10"
                                            src={coverImage}
                                            height={300}
                                            width={250}
                                            alt={title}
                                        />
                                    </div>
                                    <div className="mx-10 my-3 flex flex-col gap-6 text-left">
                                        <strong>Description: </strong>
                                        <p>{description}</p>
                                        {author && (
                                            <p>
                                                <strong>Author:</strong>{" "}
                                                {author}
                                            </p>
                                        )}
                                        {issn && (
                                            <p>
                                                <strong>ISSN: </strong> {issn}
                                            </p>
                                        )}
                                        {isbn && (
                                            <p>
                                                <strong>ISBN: </strong> {isbn}
                                            </p>
                                        )}
                                        {createdAt && (
                                            <p>
                                                <strong>Published: </strong>{" "}
                                                {formatDate(
                                                    new Date(createdAt)
                                                )}
                                            </p>
                                        )}
                                        <p>
                                            <strong>Price: </strong> Rs. {price}{" "}
                                            /-
                                        </p>
                                        <Button className="w-20">
                                            <Link
                                                href={
                                                    paymentURL
                                                        ? paymentURL
                                                        : `/sign-in`
                                                }
                                            >
                                                Buy
                                            </Link>
                                        </Button>
                                        <DrawerClose asChild>
                                            <Button
                                                className="bg-red-800 hover:bg-red-700"
                                                variant="default"
                                            >
                                                Close
                                            </Button>
                                        </DrawerClose>
                                    </div>
                                </div>
                            </DrawerDescription>
                        </DrawerHeader>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    );
}
