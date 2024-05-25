import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function page() {
    return (
        <div>
            <div>
                <div className="flex justify-between my-4">
                    <h1 className="text-2xl font-bold">Books</h1>
                    <Button>
                        <Link href={`/admin/add-book`}>Add New Book</Link>
                    </Button>
                </div>
                <Separator />
                <div>{/* Table ormat Book */}</div>
            </div>
            <div>
                <div className="flex justify-between my-4">
                    <h1 className="text-2xl font-bold">Magazines</h1>
                    <Button>
                        <Link href={`/admin/add-magazine`}>
                            Add New Magazine
                        </Link>
                    </Button>
                </div>
                <Separator />
                <div>{/* Table ormat Book */}</div>
            </div>
        </div>
    );
}

export default page;
