import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="w-full grid place-items-center content-center min-h-screen">
            <SignIn path="/sign-in" />
        </div>
    );
}
