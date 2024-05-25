import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="w-full grid place-items-center">
            <SignIn path="/sign-in" />
        </div>
    );
}
