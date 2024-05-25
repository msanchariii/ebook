"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const menuItems = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Books",
        href: "/ebooks",
    },
    {
        name: "Magazines",
        href: "/emagazines",
    },
    {
        name: "About",
        href: "/about",
    },
    {
        name: "Contact",
        href: "/contact",
    },
];

export default function Example() {
    const [isMounted, setIsMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="relative w-full bg-white">
            <div className="mx-auto w-full flex items-center justify-between px-2 py-2 sm:px-6 lg:px-8 shadow">
                <div className="inline-flex items-center space-x-2">
                    <span>
                        <Image
                            src="/brifessy.svg"
                            alt="brifessy-logo"
                            height={200}
                            width={200}
                        />
                    </span>
                </div>
                <div className="hidden lg:block">
                    <ul className="inline-flex space-x-8">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="text-sm font-semibold text-gray-800 hover:underline hover:text-emerald-600 hover:font-bold"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="hidden lg:block w-[200px] relative">
                    {isMounted && (
                        <div className="flex flex-end relative float-right">
                            <SignedIn>
                                <div className="flex">
                                    <Button
                                        className="bg-emerald-700 hover:bg-emerald-600 mx-4 my-1"
                                        variant="default"
                                    >
                                        <Link href={`/dashboard`}>
                                            Dashboard
                                        </Link>
                                    </Button>
                                    <div className="p-1 m-1">
                                        <UserButton></UserButton>
                                    </div>
                                </div>
                            </SignedIn>
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <Button className="" variant="default">
                                        Sign in
                                    </Button>
                                </SignInButton>
                            </SignedOut>
                        </div>
                    )}
                </div>
                <div className="lg:hidden">
                    <Menu
                        onClick={toggleMenu}
                        className="h-6 w-6 cursor-pointer"
                    />
                </div>
                {isMenuOpen && (
                    <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-5 pb-6 pt-5">
                                <div className="flex items-center justify-between">
                                    <div className="inline-flex items-center space-x-2">
                                        <span>
                                            <Image
                                                src="/brifessy.svg"
                                                alt="brifessy-logo"
                                                height={200}
                                                width={200}
                                            />
                                        </span>
                                    </div>
                                    <div className="-mr-2">
                                        <button
                                            type="button"
                                            onClick={toggleMenu}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            <span className="sr-only">
                                                Close menu
                                            </span>
                                            <X
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-4">
                                        {menuItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                                            >
                                                <span className="ml-3 text-base font-medium text-gray-900">
                                                    {item.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                                {isMounted && (
                                    <>
                                        <SignedIn>
                                            <div className="flex my-6">
                                                <Button
                                                    className="mx-2 bg-emerald-700 hover:bg-emerald-600"
                                                    variant="default"
                                                >
                                                    <Link href={`/dashboard`}>
                                                        Dashboard
                                                    </Link>
                                                </Button>
                                                <div className="p-1 mx-2">
                                                    <UserButton></UserButton>
                                                </div>
                                            </div>
                                        </SignedIn>
                                        <SignedOut>
                                            <SignInButton mode="modal">
                                                <Button
                                                    className="w-full my-6 mx-2"
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
                    </div>
                )}
            </div>
        </div>
    );
}
