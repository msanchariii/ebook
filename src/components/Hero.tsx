import Image from "next/image";
import Link from "next/link";
import React from "react";

const imageLinks = {
    hero: "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

function Hero() {
    return (
        <>
            {/* <div className="w-full aspect-video overflow-hidden relative rounded-3xl">
                <Image
                    src={imageLinks.hero}
                    fill
                    alt="hero-image"
                    className="object-contain rounded-3xl"
                />
            </div> */}
            <div className="min-h-screen w-full rounded-lg">
                <section className="rounded-lg bg-offwhite bg-gradient-to-br py-16 md:py-32">
                    <div className="container relative mx-auto px-4 text-center md:px-8">
                        <div className="relative top-1/2 z-10">
                            <h1 className="mb-6 text-4xl font-bold leading-tight text-leaf-200 md:text-6xl">
                                Brifessy
                            </h1>
                            <p className="mb-12 text-lg text-leaf-100 md:text-2xl">
                                Your Next Book is Just a Click Away
                            </p>
                            <Link
                                href="/ebooks"
                                className="mx-2 rounded-full bg-white px-8 py-2 font-bold text-teal-800 transition duration-200 hover:bg-teal-800 hover:text-white"
                            >
                                Shop Books
                            </Link>
                            <Link
                                href="/ebooks"
                                className="mx-2 rounded-full bg-white px-8 py-2 font-bold text-teal-800 transition duration-200 hover:bg-teal-800 hover:text-white"
                            >
                                Shop Magazines
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            <div></div>
        </>
    );
}

export default Hero;
