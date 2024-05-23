"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Example() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="p-4 w-full bg-slate-900 text-white flex justify-between">
            <div className="my-1 py-1">
                <span className="font-bold text-lg">LOGO</span>
            </div>
            <div className="flex w-3/5 gap-x-8 justify-center font-semibold my-1 py-1">
                <Link href={`/`}>Home</Link>
                <Link href={`/ebooks`}>Books</Link>
                <Link href={`/emagazines`}>Magazines</Link>
                <Link href={`/team`}>Our Team</Link>
            </div>
            <div>
                {isMounted && (
                    <>
                        <SignedIn>
                            <div className="flex">
                                <Button
                                    className="bg-slate-600 hover:bg-slate-500 mx-4 my-1"
                                    variant="default"
                                >
                                    <Link href={`/dashboard`}>Dashboard</Link>
                                </Button>
                                <div className="p-1 m-1">
                                    <UserButton></UserButton>
                                </div>
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button
                                    className="bg-slate-600 hover:bg-slate-500 mx-4 my-1"
                                    variant="default"
                                >
                                    Sign in
                                </Button>
                            </SignInButton>
                        </SignedOut>
                    </>
                )}
            </div>
        </div>
    );
}
