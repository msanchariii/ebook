import Link from "next/link";
import React from "react";

function Hero() {
    return (
        <div className="w-full h-screen rounded-lg">
            <section className="bg-gradient-to-br rounded-lg from-emerald-400 to-teal-800 py-16 md:py-32">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-white font-bold text-4xl md:text-6xl leading-tight mb-6">
                        Welcome to our <br />
                        Website
                    </h1>
                    <p className="text-white text-lg md:text-2xl mb-12">
                        Lorem ipsum, dolor sit amet consectetur adipisicing.
                    </p>
                    <Link
                        href="/ebooks"
                        className="bg-white text-teal-800 font-bold py-2 px-8 rounded-full hover:bg-teal-800 hover:text-white transition duration-200"
                    >
                        Shop Books
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Hero;
