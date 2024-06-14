"use client";
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
import { useRouter } from "next/navigation";

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
    type?: string;
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
    type,
}: BookCardProps) {
    let paymentURL;
    if (userId) {
        paymentURL = paymentLink
            ? paymentLink
            : `/checkout?type=${type}&id=${bookId}`;
    }

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.toLocaleString("default", { month: "long" });
        return `${month} ${year}`;
    };
    const router = useRouter();
    const handleClick = (id: string) => {
        router.push(`/product?type=mag&id=${id}`);
    };

    return (
        <div
            className="m-4 w-full cursor-pointer p-2 hover:bg-slate-100"
            onClick={() => handleClick(bookId)}
        >
            <div className="relative mx-auto aspect-[2/3] w-full overflow-hidden lg:w-5/6">
                <Image src={coverImage} fill alt={title} />
            </div>
            <div className="mx-6 my-2 flex flex-col gap-y-1">
                <p>{createdAt && formatDate(new Date(createdAt))}</p>
                <h3 className="text-md font-bold">{title}</h3>
                {author && (
                    <p className="font-semibold text-slate-700">{author}</p>
                )}
                {/* <Link className="" href={"/"}>
                    View
                </Link> */}
                {/* <p>Rs. {price} /-</p> */}
            </div>
            <div>
                {/* <Drawer>
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
                                                    new Date(createdAt),
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
                </Drawer> */}
            </div>
        </div>
    );
}
