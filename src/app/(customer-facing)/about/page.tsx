"use client";

import React from "react";
import { Menu, X, MapPin } from "lucide-react";
import Image from "next/image";

const locations = [
    {
        title: "Bengaluru office",
        timings: "Mon-Sat 9am to 5pm.",
        address: "100, Electronic City Phase-1, Bengaluru, Karnataka 560100 IN",
    },
    {
        title: "Head office",
        timings: "Mon-Sat 9am to 5pm.",
        address: "12th Main Rd, Indiranagar, Bengaluru, Karnataka 560008 IN",
    },
    {
        title: "Karnataka office",
        timings: "Mon-Sat 9am to 5pm.",
        address:
            "42, Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025 IN",
    },
];

const users = [
    {
        name: "Gabrielle Fernandez",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=600&w=600&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
        position: "Marketing Lead",
    },

    {
        name: "Gabrielle Fernandez",
        image: "https://images.unsplash.com/photo-1549351512-c5e12b11e283?q=80&fm=jpg&crop=faces&fit=crop&h=600&w=600",
        position: "Sales",
    },
    {
        name: "Sadie Lewis",
        image: "https://images.unsplash.com/photo-1485960994840-902a67e187c8?q=80&fm=jpg&crop=faces&fit=crop&h=600&w=600",
        position: "Marketing Lead",
    },
    // {
    //     name: "Deepika Ramesh",
    //     image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     position: "Front-end developer",
    // },

    {
        name: "Kerim Fahri",
        image: "https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=600&w=600",
        position: "Back-end developer",
    },
];

export default function AboutPageOne() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4">
                {/* Hero Map */}
                <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
                    <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
                        <p className="text-xs font-semibold leading-normal md:text-sm">
                            About the company
                        </p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
                        Made with love, right here in India
                    </p>
                    <p className="max-w-4xl text-base text-gray-600 md:text-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tempore veritatis voluptates neque itaque repudiandae
                        sint, explicabo assumenda quam ratione placeat?
                    </p>
                </div>
                <div className="w-full space-y-4">
                    <div className="relative h-[350px] w-full overflow-hidden rounded-xl">
                        <Image
                            className="object-cover md:h-full"
                            src="https://images.unsplash.com/photo-1614427771426-50fa133eebcf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="map"
                            fill
                        />
                    </div>
                </div>
                {/* locations */}
                <div className="my-8 flex flex-col gap-y-6 md:flex-row lg:justify-around">
                    {locations.map((location) => (
                        <div
                            key={location.title}
                            className="flex flex-col space-y-3 md:w-2/4 lg:w-1/5"
                        >
                            <MapPin className="h-5 w-5" />
                            <p className="w-full text-xl font-semibold text-gray-900">
                                {location.title}
                            </p>
                            <p className="w-full text-base text-gray-700">
                                {location.timings}
                            </p>
                            <p className="text-sm font-medium">
                                {location.address}
                            </p>
                        </div>
                    ))}
                </div>
                <hr className="mt-20" />
                {/* greetings */}
                <div className="mt-16 flex items-center">
                    <div className="space-y-6 md:w-3/4">
                        <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
                            <p className="text-xs font-semibold leading-normal md:text-sm">
                                Join Us &rarr;
                            </p>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 md:text-4xl">
                            Meet our team
                        </p>
                        <p className="max-w-4xl text-base text-gray-700 md:text-xl">
                            Our philosophy is simple — hire a team of diverse,
                            passionate people and foster a culture that empowers
                            you to do your best work.
                        </p>
                        <div></div>
                    </div>
                </div>
                {/* TEAM */}
                <div className="grid grid-cols-1 gap-4 gap-y-6 border-b border-gray-300 py-12 pb-20 md:grid-cols-2 lg:grid-cols-4">
                    {users.map((user) => (
                        <div className="rounded-md border" key={user.name}>
                            <div className="relative h-[300px] w-full">
                                <Image
                                    src={user.image}
                                    fill
                                    alt={user.name}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <p className="mt-6 w-full px-2 text-xl font-semibold text-gray-900">
                                {user.name}
                            </p>
                            <p className="w-full px-2 pb-6 text-sm font-semibold text-gray-500">
                                {user.position}
                            </p>
                        </div>
                    ))}
                </div>
                {/* Hiring Banner */}
                <div className="flex flex-col items-center gap-x-4 gap-y-4 py-16 md:flex-row">
                    <div className="space-y-6">
                        <p className="text-sm font-semibold md:text-base">
                            Join our team &rarr;
                        </p>
                        <p className="text-3xl font-bold md:text-4xl">
                            We&apos;re just getting started
                        </p>
                        <p className="text-base text-gray-600 md:text-lg">
                            Our philosophy is simple — hire a team of diverse,
                            passionate people and foster a culture that empowers
                            you to do your best work.
                        </p>
                        <button
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Join Now
                        </button>
                    </div>
                    <div className="md:mt-o relative mt-10 aspect-[3/2] w-full overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                            fill
                            alt="Getting Started"
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
            <hr className="mt-6" />
        </div>
    );
}
