import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Item = ({ Links, title }: any) => {
    return (
        <ul>
            <h1 className="mb-1 font-semibold">{title}</h1>
            {Links?.map((link: any) => (
                <li key={link.name}>
                    <a
                        className="cursor-pointer text-sm leading-6 text-gray-200 duration-300 hover:text-slate-900"
                        href={link.link}
                    >
                        {link.name}
                    </a>
                </li>
            ))}
        </ul>
    );
};

const ItemsContainer = () => {
    return (
        <div className="grid grid-cols-1 gap-6 px-5 py-16 sm:grid-cols-3 sm:px-8 lg:grid-cols-4">
            <Item Links={PRODUCTS} title="PRODUCTS" />
            {/* <Item Links={RESOURCES} title="RESOURCES" /> */}
            <Item Links={COMPANY} title="COMPANY" />
            <Item Links={SUPPORT} title="SUPPORT" />
        </div>
    );
};

const SocialIcons = ({ Icons }: any) => {
    return (
        <div className="text-emerald-400">
            <span className="mx-1.5 inline-flex cursor-pointer items-center rounded-full bg-gray-700 p-2 text-xl duration-300 hover:bg-emerald-950 hover:text-gray-100">
                <Facebook />
            </span>
            <span className="mx-1.5 inline-flex cursor-pointer items-center rounded-full bg-gray-700 p-2 text-xl duration-300 hover:bg-emerald-950 hover:text-gray-100">
                <Instagram />
            </span>
            <span className="mx-1.5 inline-flex cursor-pointer items-center rounded-full bg-gray-700 p-2 text-xl duration-300 hover:bg-emerald-950 hover:text-gray-100">
                <Twitter />
            </span>
            <span className="mx-1.5 inline-flex cursor-pointer items-center rounded-full bg-gray-700 p-2 text-xl duration-300 hover:bg-emerald-950 hover:text-gray-100">
                <Mail />
            </span>
        </div>
    );
};

export const PRODUCTS = [
    { name: "Drag And Drop", link: "#" },
    { name: "Visual Studio X", link: "#" },
    { name: "Easy Content", link: "#" },
];
export const RESOURCES = [
    { name: "Industries and tools", link: "#" },
    { name: "Use cases", link: "#" },
    { name: "Blog", link: "#" },
    { name: "Online evenet", link: "#" },
    { name: "Nostrud exercitation", link: "#" },
];
export const COMPANY = [
    { name: "Diversity & inclusion", link: "#" },
    { name: "About us", link: "#" },
    { name: "Press", link: "#" },
    { name: "Customer Stories", link: "#" },
    { name: "Online communities", link: "#" },
];
export const SUPPORT = [
    { name: "Documentation", link: "#" },
    { name: "Tutorials & guides", link: "#" },
    { name: "Webinars", link: "#" },
    { name: "Open-source", link: "#" },
];

export const Icons = [
    { name: "logo-facebook", link: "#" },
    { name: "logo-twitter", link: "#" },
    { name: "logo-github", link: "#" },
    { name: "logo-linkedin", link: "#" },
    { name: "logo-instagram", link: "#" },
];

const Footer = () => {
    return (
        <footer className="bg-emerald-700 text-white">
            <div className="bg-[#ffffff19] px-4 py-7 sm:px-12 md:flex md:items-center md:justify-between">
                <h1 className="mb-6 text-3xl font-semibold md:mb-0 md:w-2/5 lg:text-4xl lg:leading-normal">
                    <span className="text-slate-900">Free</span> until you are
                    ready to launch
                </h1>
                <div>
                    {/* <Input type="text"
            placeholder="Enter Your ph.no"
            className="text-gray-800 bg-slate-100
           sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 px-2 focus:outline-none"/> */}
                    <input
                        type="text"
                        placeholder="Enter Your ph.no"
                        className="mb-4 mr-1 w-full rounded px-2 py-2.5 text-gray-800 focus:outline-none sm:mr-5 sm:w-72 lg:mb-0"
                    />
                    {/* <Button className="bg-emerald-900 hover:bg-slate-900 duration-300 px-5 py-5  font-[Poppins] text-white md:w-auto w-full">
            Subscribe
          </Button> */}
                    <button className="w-full rounded-lg bg-slate-900 px-5 py-2.5 text-white duration-300 hover:bg-emerald-100 hover:text-black md:w-auto">
                        Subscribe
                    </button>
                </div>
            </div>
            <ItemsContainer />
            <div className="grid grid-cols-1 gap-10 pb-8 pt-2 text-center text-sm text-gray-400 sm:grid-cols-2 lg:grid-cols-3">
                <span>© 2020 Appy. All rights reserved.</span>
                <span>Terms · Privacy Policy</span>
                <SocialIcons Icons={Icons} />
            </div>
        </footer>
    );
};

export default Footer;
