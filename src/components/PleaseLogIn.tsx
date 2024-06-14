import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function PleaseLogIn() {
    return (
        <div className="m-4 flex flex-col gap-y-4 p-4">
            <h1>Please Sign In to Proceed</h1>
            <Button>
                <Link href={`/sign-in`}>Sign in</Link>
            </Button>
        </div>
    );
}

export default PleaseLogIn;
