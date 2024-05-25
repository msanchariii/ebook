import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

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
        </>
    );
}
