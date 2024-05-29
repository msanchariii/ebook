import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book.model";
import Magazine from "@/models/Magazine.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import Link from "next/link";

async function page() {
    cookies();
    const { userId } = auth();
    console.log("USER ID:", userId);

    // console.log(sessionId);
    const user = await currentUser();
    // console.log(user);
    const email = user?.emailAddresses[0].emailAddress;
    console.log("Email: ", email);

    if (!userId) {
        return (
            <>
                <div>Please Login first</div>
            </>
        );
    }

    const response = await fetch(
        `${process.env.BASE_URL}/api/get-user-dashboard?userId=${userId}&userEmail=${email}`,
        { cache: "no-store" }
    );
    const responseData = await response.json();

    // console.log(responseData.data.books);
    let myBookIds;
    let myMagIds;
    if (responseData.success) {
        myBookIds = responseData.data.books;
        myMagIds = responseData.data.mags;
    }
    // console.log("Type of MyBooks:", typeof myBookIds);

    await dbConnect();

    let myBooks;
    if (myBookIds.length > 0) {
        myBooks = await Book.find({ _id: { $in: myBookIds } });
    }
    let myMags;
    if (myMagIds.length > 0) {
        myMags = await Magazine.find({ _id: { $in: myMagIds } });
    }

    return (
        <div>
            {/* Books */}
            <div>
                {myBooks?.map((book) => (
                    <div
                        key={book._id}
                        className="my-4 flex flex-col gap-y-2 bg-yellow-200 w-1/3 p-4 rounded-lg mx-1"
                    >
                        <h1 className="font-semibold">{book.title}</h1>
                        <p>{book.author}</p>
                        <Button>
                            <Link
                                href={`/read?type=book&itemId=${book._id}&userId=${userId}`}
                            >
                                Read
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>
            {/* Magazines */}
            <div>
                {myMags?.map((mag) => (
                    <div
                        key={mag._id}
                        className="my-4 flex flex-col gap-y-2 bg-yellow-200 w-1/3 p-4 rounded-lg mx-1"
                    >
                        <h1 className="font-semibold">{mag.title}</h1>
                        <p>{mag.author}</p>
                        <Button>
                            <Link
                                href={`/read?type=mag&itemId=${mag._id}&userId=${userId}`}
                            >
                                {" "}
                                Read{" "}
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default page;
