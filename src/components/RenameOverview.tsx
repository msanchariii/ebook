import React from "react";
import Image from "next/image";

interface ProductOverviewProps {
    title: string;
    author: string;
    description: string;
    price: number;
    image: string;
    children?: React.ReactNode; // Add children prop type
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({
    title,
    author,
    description,
    price,
    image,
    children, // Destructure children prop
}) => {
    return (
        <section className="overflow-hidden">
            <div className="mx-auto max-w-5xl px-5 py-24">
                <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
                    <Image
                        src={image}
                        alt={title}
                        height={200}
                        width={200}
                        className="h-64 w-full rounded-lg object-contain lg:h-96 lg:w-1/2"
                    />
                    <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                        <h2 className="text-3xl font-semibold tracking-widest text-gray-500">
                            {title}
                        </h2>
                        <h1 className="text-md my-4 font-semibold text-black">
                            {author && <> {author} </>}
                        </h1>
                        <p className="leading-relaxed">{description}</p>
                        <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5"></div>
                        <div className="flex items-center justify-between">
                            <span className="title-font text-xl font-bold text-gray-900">
                                ₹ {price}
                            </span>
                            {children} {/* Render children here */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
