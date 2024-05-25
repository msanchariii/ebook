import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="w-full grid place-items-center content-center min-h-screen my-8">
            <div className="">
                <SignUp path="/sign-up" />
            </div>
        </div>
    );
}
