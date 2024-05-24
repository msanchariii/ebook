import Dashboard from "@/components/Dashboard";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book.model";
import { auth } from "@clerk/nextjs/server";

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
        `http://localhost:3000/api/get-user-dashboard?userId=${userId}`
    );
    const responseData = await response.json();

    console.log(responseData.data.books);
    let myBookIds;
    if (responseData.success) {
        myBookIds = responseData.data.books;
    }
    console.log("Type of MyBooks:", typeof myBookIds);

    await dbConnect();

    // Find all books by their IDs using the $in operator
    let myBooks;
    if (myBookIds.length > 0) {
        myBooks = await Book.find({ _id: { $in: myBookIds } });
    }

    return (
        <Dashboard userId={userId}>
            {myBooks?.map((book) => (
                <div key={book._id} className="my-4">
                    <h1>{book.title}</h1>
                    <p>{book.author}</p>
                    {/* Add more book details as needed */}
                </div>
            ))}
        </Dashboard>
    );
}

export default page;
