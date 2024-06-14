import { ChevronDown, Star } from "lucide-react";
import React from "react";

async function page({
    searchParams,
}: {
    searchParams: { type: string; id: string };
}) {
    const type = searchParams.type;
    const itemId = searchParams.id;
    const url = `${process.env.BASE_URL}/api/product?type=${type}&id=${itemId}`;

    console.log("URL: ", url);

    const response = await fetch(url);
    let item;
    let responseData;
    if (response.ok) {
        responseData = await response.json();
        item = responseData.data;
    }

    const date = new Date(item.createdAt);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    console.log(item.coverImage);

    return (
        <section className="overflow-hidden">
            <div className="mx-auto max-w-5xl px-5 py-24">
                <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
                    <img
                        alt={item.title}
                        className="h-64 w-full rounded object-contain lg:h-96 lg:w-1/2"
                        src={item.coverImage}
                    />
                    <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                        {item.author && (
                            <h2 className="text-sm font-semibold tracking-widest text-gray-500">
                                {item.author}
                            </h2>
                        )}
                        <h1 className="my-4 text-3xl font-semibold text-black">
                            {item.title}
                        </h1>
                        <h2 className="my-4 text-xl font-semibold text-[#282828]">
                            {month}, {year}
                        </h2>
                        <div className="my-4 flex items-center">
                            {/* <span className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className="text-yellow-500"
                                        />
                                    ))}
                                    <span className="ml-3 inline-block text-xs font-semibold">
                                        4 Reviews
                                    </span>
                                </span> */}
                        </div>
                        <p className="leading-relaxed">{item.description}</p>
                        <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
                            <div className="flex items-center">
                                <span className="mr-3 text-sm font-semibold">
                                    Color
                                </span>
                                <button className="h-6 w-6 rounded-full border-2 border-gray-300 focus:outline-none"></button>
                                <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-gray-700 focus:outline-none"></button>
                                <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-green-200 focus:outline-none"></button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="title-font text-xl font-bold text-gray-900">
                                ₹ {item.price}
                            </span>
                            <button
                                type="button"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
// 66503b65f6b077b1a72ce702
export default page;
