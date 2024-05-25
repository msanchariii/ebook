import type { Metadata } from "next";
import AdminNavbar from "./_components/Navbar";

export const metadata: Metadata = {
    title: "Brifessy Admin Panel",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AdminNavbar></AdminNavbar>
            <main className="min-h-screen p-4">{children}</main>
        </>
    );
}
