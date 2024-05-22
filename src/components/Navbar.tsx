import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function Example() {
    const authData = auth();
    // console.log(authData); // userId, sessionId

    return (
        <div className="p-4">
            <SignedIn>
                <UserButton></UserButton>
            </SignedIn>
            <SignedOut>
                <span className="bg-green-700 p-2 m-2 rounded">
                    <SignInButton />
                </span>
            </SignedOut>

            {/* <p>User Id: {userId}</p> */}
            {/* <p>Session Id : {sessionId}</p> */}

            {/* {user && (
                <Link
                    className="bg-green-700 p-3 rounded m-4"
                    href={`/dashboard`}
                >
                    Dashboard
                </Link>
            )} */}
            {/* <p>Token: {getToken()}</p> */}
            {/* Hello, {userId} your current active session is {sessionId} */}
        </div>
    );
}
