import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import Buy from "../Buttons/Buy";
import Link from "next/link";

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
}: any) {
    const paymentURL = paymentLink
        ? paymentLink
        : `/checkout?amount=${price}&bookId=${bookId}&userId=${userId}`;
    return (
        <div className="bg-slate-100 shadow rounded-lg w-72 p-4 m-4">
            <div className="mx-6">
                <Image src={coverImage} height={250} width={180} alt={title} />
            </div>
            <div className="flex flex-col gap-y-1 my-2 mx-6">
                <h2 className="text-md font-bold">{title}</h2>
                <p className="font-semibold text-slate-700">{author}</p>
                <p>Rs. {price} /-</p>
            </div>
            <div>
                <Drawer>
                    <DrawerTrigger asChild className="">
                        <Button className="mx-6"> View </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className="mx-20 my-3 text-2xl">
                                {title}
                            </DrawerTitle>
                            <DrawerDescription className="mx-10 my-2 text-black">
                                <div className="flex flex-col lg:flex-row ">
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
                                        {/* <h2>{title}</h2> */}
                                        <strong>Description: </strong>
                                        <p>{description}</p>
                                        <p>
                                            <strong>Author:</strong> {author}
                                        </p>
                                        {issn && (
                                            <p>
                                                <strong>ISBN: </strong> {issn}
                                            </p>
                                        )}

                                        <p>
                                            <strong>Price: </strong> Rs. {price}
                                            /-
                                        </p>

                                        {/* <Button className="w-16">Buy</Button> */}
                                        <Button className="w-20">
                                            <Link href={paymentURL}>Buy</Link>
                                        </Button>
                                        {/* <Buy
                                            paymentButtonId={paymentButtonId}
                                        /> */}

                                        <DrawerClose asChild className="w-16">
                                            <Button
                                                className="bg-red-800 hover:bg-red-700"
                                                variant="default"
                                            >
                                                CLose
                                            </Button>
                                        </DrawerClose>
                                    </div>
                                </div>
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter></DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    );
}
