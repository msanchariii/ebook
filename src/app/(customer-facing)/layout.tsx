import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FooterThree } from "@/components/Footer2";

export const metadata: Metadata = {
    title: "Brifessy",
    description: "",
};

export default function CustomerFacingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen p-4">{children}</main>
            {/* <Footer /> */}
            <FooterThree />
        </>
    );
}
