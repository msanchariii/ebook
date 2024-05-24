import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book.model";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

async function page() {
    const { userId } = auth();
    if (!userId) {
        return (
            <>
                <div>Please Login first</div>
            </>
        );
    }

    const response = await fetch(
        `${process.env.BASE_URL}/api/get-user-dashboard?userId=${userId}`,
        { cache: "no-store" }
    );
    const responseData = await response.json();

    console.log(responseData.data.books);
    let myBookIds;
    if (responseData.success) {
        myBookIds = responseData.data.books;
    }
    console.log("Type of MyBooks:", typeof myBookIds);

    await dbConnect();

    let myBooks;
    if (myBookIds.length > 0) {
        myBooks = await Book.find({ _id: { $in: myBookIds } });
    }

    return (
        <Dashboard userId={userId}>
            {myBooks?.map((book) => (
                <div
                    key={book._id}
                    className="my-4 flex flex-col gap-y-2 bg-yellow-200 w-1/3 p-4 rounded-lg mx-1"
                >
                    <h1 className="font-semibold">{book.title}</h1>
                    <p>{book.author}</p>
                    <Button>
                        <Link href={`/dashboard/read/${book._id}`}>Read</Link>
                    </Button>
                </div>
            ))}
        </Dashboard>
    );
}

export default page;
